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
import { UniversitiesService } from '../../../core/backend/dashboard/services';
import Swal from 'sweetalert2';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    DatePickerModule,
    ToggleSwitchModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  minDate: Date = new Date();
  selectedFile: File | null = null;
  // Base URL for the logo image
  baseUrl: string = 'image/Logo/';
  Logo:
    | string
    | ArrayBuffer
    | null = `${this.baseUrl}pngtree-file-upload-icon-png-image_4646955.jpg`;

  readonly #unversitieService = inject(UniversitiesService);
  loading: boolean = false;
  // Form group for creating a university
  createUniversity: FormGroup = new FormGroup({
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
          this.createUniversity.get('BannerImage')?.setValue(this.selectedLogo);
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
            ? `${paidUntilValue.getFullYear()}-${(paidUntilValue.getMonth() + 1)
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
