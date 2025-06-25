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
import Swal from 'sweetalert2';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CollegesService } from '../../../../core/backend/dashboard/services';

@Component({
  selector: 'app-create-college',
  imports: [ButtonModule , DatePickerModule ,ToggleSwitchModule ,FormsModule, ReactiveFormsModule ],
  templateUrl: './create-college.component.html',
  styleUrl: './create-college.component.scss'
})
export class CreateCollegeComponent {
  minDate: Date = new Date();
  selectedFile: File | null = null;
    readonly #collegeService = inject(CollegesService);
  // Base URL for the logo image
  baseUrl: string = 'image/Logo/';
  Logo:
    | string
    | ArrayBuffer
    | null = `${this.baseUrl}pngtree-file-upload-icon-png-image_4646955.jpg`;
  loading: boolean = false;
  createCollege: FormGroup = new FormGroup({
    Email: new FormControl<string | undefined>(
      isDevMode() ? 'facultyOfLaw@gmail.com' : undefined,
      [Validators.required]
    ),
    Name: new FormControl<string | undefined>(
      isDevMode() ? 'facultyOfLaw' : undefined,
      [Validators.required]
    ),
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
          this.createCollege.get('LogoImage')?.setValue(file);
        }

        const reader = new FileReader();
        reader.onload = () => {
          this.Logo = reader.result;
        };
        reader.readAsDataURL(file);
      } else if (from === 'banner') {
        this.selectedBanner = file;

        if (this.selectedBanner) {
          this.createCollege.get('BannerImage')?.setValue(this.selectedLogo);
        }
      }
    }
  }
  create() {
      this.loading = true;
      const Data = this.createCollege.value;
      this.#collegeService
        .apiCollegesCreateCollegePost({
          body: {
            Name: this.createCollege.get('Name')?.value,
            Address: this.createCollege.get('Address')?.value,
            BannerImage: this.createCollege.get('BannerImage')?.value,
            Description: this.createCollege.get('Description')?.value,
            Email: this.createCollege.get('Email')?.value,
            LogoImage: this.createCollege.get('LogoImage')?.value,
            PhoneNumber: this.createCollege.get('PhoneNumber')?.value,
            WebAddress: this.createCollege.get('WebAddress')?.value,
          },
        })
        .subscribe({
          next: (res) => {
            this.loading = false;
            Swal.fire({
              title: 'College Created Successfully',
              icon: 'success',
            }).then(() => {
              this.createCollege.reset();
              this.selectedLogo = undefined;
              this.selectedBanner = undefined;
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
