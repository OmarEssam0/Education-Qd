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
import { CoursesService } from '../../../../core/backend/dashboard/services';
import Swal from 'sweetalert2';
import { CourseByCollegeIdResponseDto } from '../../../../core/backend/dashboard/models/Education/Application/UseCases/Courses/GetAllCoursesQuery/course-by-college-id-response-dto';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-create-courses',
  imports: [
    ButtonModule,
    DatePickerModule,
    ToggleSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  templateUrl: './create-courses.component.html',
  styleUrl: './create-courses.component.scss',
})
export class CreateCoursesComponent {
  loading: boolean = false;
  readonly #coursesService = inject(CoursesService);
  createCourse: FormGroup = new FormGroup({
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
    this.getAllCourses()
  }
  create() {
    this.loading = true;
    const Data = this.createCourse.value;
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
  allCourses: CourseByCollegeIdResponseDto[] = [];
  getAllCourses() {
    this.#coursesService.apiCoursesGetAllCoursesGet().subscribe({
      next: (res) => {
        this.allCourses = res.courses!;
      },
    });
  }
}
