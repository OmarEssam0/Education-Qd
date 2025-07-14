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
  ProfessorsService,
  TemplateService,
} from '../../../../core/backend/dashboard/services';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-create-professor',
  imports: [
    ButtonModule,
    DatePickerModule,
    ToggleSwitchModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  templateUrl: './create-professor.component.html',
  styleUrl: './create-professor.component.scss',
})
export class CreateProfessorComponent {
  loading: boolean = false;
  id!: string;
  readonly #professorService = inject(ProfessorsService);
  readonly #TemplateService = inject(TemplateService);
  readonly #Route = inject(Router);
  constructor(private Route: ActivatedRoute) {
    Route.queryParamMap.subscribe({
      next: (data) => {
        this.id = data.get('id') ?? '';
      },
    });
    if (this.id) {
      this.setValue();
    }
  }

  setValue() {
    this.#professorService
      .apiProfessorsGetProfessorGet({
        Id: this.id,
      })
      .subscribe({
        next: (res) => {
          this.createProfessor.patchValue({
            id: this.id,
            Email: res.email,
            Name: res.name,
          });
        },
      });
  }
  createProfessor: FormGroup = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    Email: new FormControl<string | undefined>(
      isDevMode() ? 'professor@gmail.com' : undefined,
      [Validators.required]
    ),
    Name: new FormControl<string | undefined>(
      isDevMode() ? 'professor' : undefined,
      [Validators.required]
    ),
  });

  create() {
    this.loading = true;
    const Data = this.createProfessor.value;
    if (Data.id) {
      this.#professorService
        .apiProfessorsUpdateProfessorPut({
          body: {
            id: Data.id,
            name: Data.Name,
          },
        })
        .subscribe({
          next: (res) => {
            this.loading = false;
            Swal.fire({
              title: 'College Updated Successfully',
              icon: 'success',
            }).then(() => {
              this.createProfessor.reset();
              this.#Route.navigate(['/education/view-professor']);
            });
          },
          error: (err) => {
            this.loading = false;
            Swal.fire({
              title: err.error[0]?.message || 'Error creating College',
              icon: 'error',
            });
          },
        });
    } else {
      this.#professorService
        .apiProfessorsCreateProfessorPost({
          body: {
            email: Data.Email,
            name: Data.Name,
          },
        })
        .subscribe({
          next: (res) => {
            this.loading = false;
            Swal.fire({
              title: 'College Created Successfully',
              icon: 'success',
            }).then(() => {
              this.createProfessor.reset();
            });
          },
          error: (err) => {
            this.loading = false;
            Swal.fire({
              title: err.error[0]?.message || 'Error creating College',
              icon: 'error',
            });
          },
        });
    }
  }

  onExcelUpload(event: any) {
    const file = event.files[0];
    console.log('Selected file:', file);
    this.importProfessor(file);

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
  importProfessor(file: Blob) {
    this.#professorService
      .apiProfessorsImportProfessorsPost({
        body: {
          ProfessorsExcel: file,
        },
      })
      .subscribe({
        next: (res) => {
          Swal.fire({
            title: 'File Uploaded Successfully',
            icon: 'success',
          }).then((e) => {
            this.#Route.navigate(['/education/view-professor']);
          });
        },
        error: (err) => {
          console.log(err);
          
          this.errorContent = err.error.errors.failedRecordsDetails!;
          this.visible = true;
        },
      });
  }
  file: any;
  downloadExeclTemplate() {
    this.#TemplateService
      .apiTemplateGetImportTemplateGet({
        Type: 'Professor',
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
            a.download = 'Profosser Template.xlsx';
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
}
