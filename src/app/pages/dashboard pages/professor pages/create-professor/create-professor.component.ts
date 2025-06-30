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
import { ProfessorsService } from '../../../../core/backend/dashboard/services';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-professor',
  imports: [
    ButtonModule,
    DatePickerModule,
    ToggleSwitchModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-professor.component.html',
  styleUrl: './create-professor.component.scss',
})
export class CreateProfessorComponent {
  loading: boolean = false;
  id!: string;
  readonly #professorService = inject(ProfessorsService);
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
}
