import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfessorsService } from '../../../../core/backend/dashboard/services';
import { GetOwnProfessorCourseResponse } from '../../../../core/backend/dashboard/models/Education/Application/UseCases/Professors/GetOwnProfessorCourseQuery/get-own-professor-course-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-spec-course-to-professor',
  imports: [RouterLink],
  templateUrl: './view-spec-course-to-professor.component.html',
  styleUrl: './view-spec-course-to-professor.component.scss',
})
export class ViewSpecCourseToProfessorComponent {
  id!: string;
  readonly #professorServices = inject(ProfessorsService);
  constructor(private Route: ActivatedRoute) {
    if (Route.snapshot.paramMap.get('id') != null) {
      this.id = Route.snapshot.paramMap.get('id') ?? '';
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getSpecProfessorCourse()
  }

  SpecProfessorCourse!: GetOwnProfessorCourseResponse ;
  getSpecProfessorCourse() {
    this.#professorServices
      .apiProfessorsGetOwnProfessorCourseGet({
        ProfessorCourseId: this.id,
      })
      .subscribe({
        next: (res) => {
          this.SpecProfessorCourse = res;
        },
        error: err =>{
          Swal.fire({
            title:'Something error',
            icon: 'error'
          })
        }
      });
  }
}
