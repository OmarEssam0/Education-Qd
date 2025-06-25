import { Component, inject, isDevMode } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ProfessorsService } from '../../../../core/backend/dashboard/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-professor',
  imports: [ButtonModule , DatePickerModule ,ToggleSwitchModule ,FormsModule, ReactiveFormsModule ],
  templateUrl: './create-professor.component.html',
  styleUrl: './create-professor.component.scss'
})
export class CreateProfessorComponent {
  loading: boolean = false;
  readonly #professorService = inject(ProfessorsService);
 createProfessor: FormGroup = new FormGroup({
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
