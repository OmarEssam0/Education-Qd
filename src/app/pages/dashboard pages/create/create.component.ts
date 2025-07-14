import { Component, inject, isDevMode } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import {
  TemplateService,
  UniversitiesService,
} from '../../../core/backend/dashboard/services';
import Swal from 'sweetalert2';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    DatePickerModule,
    ToggleSwitchModule,
    FileUploadModule,
    DialogModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  minDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  selectedFile: File | null = null;
  id!: string;
  // Base URL for the logo image
  baseUrl: string = 'image/Logo/';
  Logo:
    | string
    | ArrayBuffer
    | null = `${this.baseUrl}pngtree-file-upload-icon-png-image_4646955.jpg`;

  readonly #unversitieService = inject(UniversitiesService);
  readonly #Route = inject(Router);
  readonly #TemplateService = inject(TemplateService);
  constructor(private Route: ActivatedRoute) {
    Route.queryParamMap.subscribe({
      next: (data) => {
        this.id = data.get('id') ?? '';
      },
    });
    this.setValue();
  }

  setValue() {
    this.#unversitieService
      .apiUniversitiesGetUniversityGet({
        Id: this.id,
      })
      .subscribe({
        next: (res) => {
          this.createUniversity.patchValue({
            id: this.id,
            Email: res.email,
            UniversityName: res.name,
            PaidUntil: res.paidUntil ? new Date(res.paidUntil) : null,
            PhoneNumber: res.phoneNumber,
            WebAddress: res.webAddress,
            Description: res.description,
            Address: res.address,
            IsPaid: res.isPaid,
            LogoImage: res.logoImage?.filePath,
            BannerImage: res.bannerImage?.filePath,
          });
        },
      });
  }
  loading: boolean = false;
  // Form group for creating a university
  createUniversity: FormGroup = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    Email: new FormControl<string | undefined>(
      isDevMode() ? 'Cairo@gmail.com' : undefined,
      [Validators.required]
    ),
    UniversityName: new FormControl<string | undefined>(
      isDevMode() ? 'Cairo' : undefined,
      [Validators.required]
    ),
    PaidUntil: new FormControl(undefined, [Validators.required]),
    PhoneNumber: new FormControl<string | undefined>(
      isDevMode() ? '01123456789' : undefined,
      [Validators.required]
    ),
    WebAddress: new FormControl(
      isDevMode() ? 'http://cairoUniversity.com' : undefined,
      [Validators.required, Validators.pattern('https?://.+')]
    ),
    Description: new FormControl<string | undefined>(
      isDevMode() ? 'this is university , created by superAdmin ' : undefined,
      [Validators.required]
    ),
    Address: new FormControl(isDevMode() ? 'cairo/egypt' : undefined, [
      Validators.required,
    ]),
    IsPaid: new FormControl(false, [Validators.required]),
    LogoImage: new FormControl(undefined, [Validators.required]),
    BannerImage: new FormControl(undefined, [Validators.required]),
  });

  selectedLogo: File | undefined = undefined;
  selectedBanner: File | undefined = undefined;

  onFileChange(event: Event, from: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(file);

      if (from === 'logo') {
        this.selectedLogo = file;
        if (this.selectedLogo) {
          this.createUniversity.get('LogoImage')?.setValue(file);
        }

        const reader = new FileReader();
        reader.onload = () => {
          this.Logo = reader.result;
        };
        reader.readAsDataURL(file);
      } else if (from === 'banner') {
        this.selectedBanner = file;

        if (this.selectedBanner) {
          this.createUniversity
            .get('BannerImage')
            ?.setValue(this.selectedBanner);
        }
      }
    }
  }
  getDateToIsoString() {
    this.createUniversity.get('PaidUntil')?.value
      ? new Date(this.createUniversity.get('PaidUntil')?.value)
          .toISOString()
          .split('T')[0]
      : null;
  }
  create() {
    const paidUntilValue = this.createUniversity.get('PaidUntil')?.value;
    this.loading = true;
    this.getDateToIsoString();
    const Data = this.createUniversity.value;
    if (Data.id) {
      this.#unversitieService
        .apiUniversitiesUpdateUniversityPut({
          body: {
            id: Data.id != null ? Data.id : undefined,
            address: this.createUniversity.get('Address')?.value,
            description: this.createUniversity.get('Description')?.value,
            isPaid: this.createUniversity.get('IsPaid')?.value,
            paidUntil: paidUntilValue
              ? `${paidUntilValue.getFullYear()}-${(
                  paidUntilValue.getMonth() + 1
                )
                  .toString()
                  .padStart(2, '0')}-${paidUntilValue
                  .getDate()
                  .toString()
                  .padStart(2, '0')}`
              : undefined,
            phoneNumber: this.createUniversity.get('PhoneNumber')?.value,
            universityName: this.createUniversity.get('UniversityName')?.value,
            webAddress: this.createUniversity.get('WebAddress')?.value,
          },
        })
        .subscribe({
          next: (res) => {
            this.loading = false;
            Swal.fire({
              title: 'University Updated Successfully',
              icon: 'success',
            }).then(() => {
              this.createUniversity.reset();
              this.#Route.navigate(['/education/viewUnversity']);
            });
          },
          error: (err) => {
            this.loading = false;
            Swal.fire({
              title: err.error.msg,
              icon: 'error',
            });
          },
        });
    } else {
      this.#unversitieService
        .apiUniversitiesCreateUniversityPost({
          body: {
            Address: this.createUniversity.get('Address')?.value,
            BannerImage: this.createUniversity.get('BannerImage')?.value,
            Description: this.createUniversity.get('Description')?.value,
            Email: this.createUniversity.get('Email')?.value,
            IsPaid: this.createUniversity.get('IsPaid')?.value,
            LogoImage: this.createUniversity.get('LogoImage')?.value,
            PaidUntil: paidUntilValue
              ? `${paidUntilValue.getFullYear()}-${(
                  paidUntilValue.getMonth() + 1
                )
                  .toString()
                  .padStart(2, '0')}-${paidUntilValue
                  .getDate()
                  .toString()
                  .padStart(2, '0')}`
              : undefined,
            PhoneNumber: this.createUniversity.get('PhoneNumber')?.value,
            UniversityName: this.createUniversity.get('UniversityName')?.value,
            WebAddress: this.createUniversity.get('WebAddress')?.value,
          },
        })
        .subscribe({
          next: (res) => {
            this.loading = false;
            Swal.fire({
              title: 'University Created Successfully',
              icon: 'success',
            }).then(() => {
              this.createUniversity.reset();
              this.selectedLogo = undefined;
              this.selectedBanner = undefined;
            });
          },
          error: (err) => {
            this.loading = false;
            Swal.fire({
              title: err.error[0]?.message || 'Error creating university',
              icon: 'error',
            });
          },
        });
    }
  }
  onExcelUpload(event: any) {
    const file = event.files[0];
    this.importUniversities(file);
  }
  visible: boolean = false;
  errorContent: any[] = [];
  importUniversities(file: Blob) {
    this.#unversitieService
      .apiUniversitiesImportUniversitiesPost({
        body: {
          UniversitiesExcel: file,
        },
      })
      .subscribe({
        next: (res) => {
          Swal.fire({
            title: 'File Uploaded Successfully',
            icon: 'success',
          }).then((e) => {
            this.#Route.navigate(['/education/viewUnversity']);
          });
        },
        error: (err) => {
          this.errorContent = err.error.errors.failedRecordsDetails!;
          this.visible = true;
        },
      });
  }

  file: any;
  downloadExeclTemplate() {
    this.#TemplateService
      .apiTemplateGetImportTemplateGet({
        Type: 'University',
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
            a.download = 'University Template.xlsx';
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
