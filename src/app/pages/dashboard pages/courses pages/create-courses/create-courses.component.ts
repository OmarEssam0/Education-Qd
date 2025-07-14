import { Component, inject, isDevMode } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import {
  CoursesService,
  TemplateService,
} from '../../../../core/backend/dashboard/services';
import Swal from 'sweetalert2';
import { CourseByCollegeIdResponseDto } from '../../../../core/backend/dashboard/models/Education/Application/UseCases/Courses/GetAllCoursesQuery/course-by-college-id-response-dto';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-create-courses',
  imports: [
    ButtonModule,
    DatePickerModule,
    ToggleSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FileUploadModule,
    DialogModule,
  ],
  templateUrl: './create-courses.component.html',
  styleUrl: './create-courses.component.scss',
})
export class CreateCoursesComponent {
  loading: boolean = false;
  id!: string;
  readonly #coursesService = inject(CoursesService);
  readonly #TemplateService = inject(TemplateService);
  readonly #Route = inject(Router);
  constructor(private Route: ActivatedRoute) {
    Route.queryParamMap.subscribe({
      next: (data) => {
        this.id = data.get('id') ?? '';
      },
    });
    this.setValue();
  }

  setValue() {
    this.#coursesService
      .apiCoursesGetCourseGet({
        Id: this.id,
      })
      .subscribe({
        next: (res) => {
          this.createCourse.patchValue({
            id: this.id,
            title: res.title,
            code: res.code,
          });
        },
      });
  }
  createCourse: FormGroup = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    code: new FormControl<string | undefined>(isDevMode() ? '1' : undefined, [
      Validators.required,
    ]),
    title: new FormControl<string | undefined>(
      isDevMode() ? 'Front End Developer' : undefined,
      [Validators.required]
    ),
    prerequisiteCourseIds: new FormControl<string | undefined>(undefined, [
      Validators.required,
    ]),
  });
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllCourses();
  }
  create() {
    this.loading = true;
    const Data = this.createCourse.value;
    console.log(Data);

    if (Data.id) {
      this.#coursesService
        .apiCoursesUpdateCoursePut({
          body: {
            code: Data.code,
            id: Data.id,
            title: Data.title,
          },
        })
        .subscribe({
          next: (res) => {
            this.loading = false;
            Swal.fire({
              title: 'Course Updated Successfully',
              icon: 'success',
            }).then(() => {
              this.createCourse.reset();
              this.#Route.navigate(['/education/view-courses']);
            });
          },
          error: (err) => {
            this.loading = false;
            console.log(err);

            Swal.fire({
              title: err.error.detail,
              icon: 'error',
            });
          },
        });
    } else {
      this.#coursesService
        .apiCoursesCreateCoursePost({
          body: Data,
        })
        .subscribe({
          next: (res) => {
            this.loading = false;
            Swal.fire({
              title: 'Course Created Successfully',
              icon: 'success',
            }).then(() => {
              this.createCourse.reset();
              this.#Route.navigate(['/education/view-courses']);
            });
          },
          error: (err) => {
            this.loading = false;
            Swal.fire({
              title: err.error[0]?.message || 'Error creating Course',
              icon: 'error',
            });
          },
        });
    }
  }
  allCourses: CourseByCollegeIdResponseDto[] = [];
  getAllCourses() {
    this.#coursesService.apiCoursesGetAllCoursesGet().subscribe({
      next: (res) => {
        this.allCourses = res.courses!;
      },
    });
  }

  file: any;
  downloadExeclTemplate() {
    this.#TemplateService
      .apiTemplateGetImportTemplateGet({
        Type: 'Course',
      })
      .subscribe({
        next: (res) => {
          this.file = res;
          if (res !== undefined && res !== null) {
            // const blob = new Blob([res], {
            //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            // });
            const url = window.URL.createObjectURL(this.file);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Course Template.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
          } else {
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  onExcelUpload(event: any) {
    const file = event.files[0];
    console.log('Selected file:', file);
    this.importCourse(file);

    // // لو عاوز تقرأ محتوى ملف Excel
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   const data = new Uint8Array(e.target.result);
    //   // تقدر تستخدم مكتبة xlsx لقراءة البيانات هنا
    //   console.log('Excel file loaded!');
    // };
    // reader.readAsArrayBuffer(file);
  }
  visible: boolean = false;
  errorContent: any[] = [];
  importCourse(file: Blob) {
    this.#coursesService
      .apiCoursesImportCoursesPost({
        body: {
          CoursesExcel: file,
        },
      })
      .subscribe({
        next: (res) => {
          Swal.fire({
            title: 'File Uploaded Successfully',
            icon: 'success',
          }).then((e) => {
            this.#Route.navigate(['/education/view-courses']);
          });
        },
        error: (err) => {
          console.log(err);
          this.errorContent = err.error.errors.failedRecordsDetails!;
          this.visible = true;
        },
      });
  }
}
