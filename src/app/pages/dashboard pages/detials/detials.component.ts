import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  CollegesService,
  CoursesService,
  ProfessorsService,
  StudentsService,
  UniversitiesService,
} from '../../../core/backend/dashboard/services';
import { GetUniversityResponse } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Universities/GetUniversityQuery/get-university-response';
import { GetCollegeResponse } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Colleges/GetCollegeQuery/get-college-response';
import { GetCourseResponse } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Courses/GetCourseQuery/get-course-response';
import { GetProfessorResponse } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Professors/GetProfessorQuery/get-professor-response';
import { GetStudentResponse } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Students/GetStudentQuery/get-student-response';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detials',
  imports: [RouterLink, ButtonModule],
  templateUrl: './detials.component.html',
  styleUrl: './detials.component.scss',
})
export class DetialsComponent {
  id: string = '';
  type: string | null = '';
  back: string | null = '';
  navigate!: string;
  @Output() itemEvent: EventEmitter<string> = new EventEmitter();
  readonly #universityServices = inject(UniversitiesService);
  readonly #collegeServices = inject(CollegesService);
  readonly #courseServices = inject(CoursesService);
  readonly #studentServices = inject(StudentsService);
  readonly #professorServices = inject(ProfessorsService);
  readonly #NavigateServices = inject(Router);
  constructor(private Route: ActivatedRoute) {
    Route.paramMap.subscribe({
      next: (data) => {
        this.id = data.get('id') ?? '';
        this.type = data.get('type');
      },
    });
    this.Route.queryParamMap.subscribe((params) => {
      this.type = params.get('type');
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.runCode();
  }
  // university call
  universityDetials!: GetUniversityResponse;
  getSpecUniversty(id: string) {
    this.#universityServices
      .apiUniversitiesGetUniversityGet({
        Id: id,
      })
      .subscribe({
        next: (res) => {
          this.universityDetials = res;
        },
      });
  }
  // college call
  collegeDetials!: GetCollegeResponse;
  getSpecCollege(id: string) {
    this.#collegeServices
      .apiCollegesGetCollegeGet({
        Id: id,
      })
      .subscribe({
        next: (res) => {
          this.collegeDetials = res;
        },
      });
  }

  // if Course call
  courseDetials!: GetCourseResponse;
  getSpecCourse(id: string) {
    this.#courseServices
      .apiCoursesGetCourseGet({
        Id: id,
      })
      .subscribe({
        next: (res) => {
          this.courseDetials = res;
        },
      });
  }
  // if Professor call
  professorDetials!: GetProfessorResponse;
  getSpecProfessor(id: string) {
    this.#professorServices
      .apiProfessorsGetProfessorGet({
        Id: id,
      })
      .subscribe({
        next: (res) => {
          this.professorDetials = res;
        },
      });
  }
  // if Student call
  studentDetials!: GetStudentResponse;
  getSpecStudent(id: string) {
    this.#studentServices
      .apiStudentsGetStudentGet({
        Id: id,
      })
      .subscribe({
        next: (res) => {
          this.studentDetials = res;
        },
      });
  }

  // editeFnc
  edit() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemEvent.emit(this.id);
        this.#NavigateServices.navigate([this.navigate], {
          queryParams: {
            id: this.id,
          },
        });
      }
    });
  }

  runCode() {
    if (this.type) {
      switch (this.type) {
        case 'university':
          this.getSpecUniversty(this.id);
          this.back = '/education/viewUnversity';
          this.navigate = '/education/create';
          break;
        case 'college':
          this.getSpecCollege(this.id);
          this.back = '/education/viewCollege';
          this.navigate = '/education/create-college';
          break;
        case 'Course':
          this.getSpecCourse(this.id);
          this.back = '/education/view-courses';
          this.navigate = '/education/create-courses';
          break;
        case 'Professor':
          this.getSpecProfessor(this.id);
          this.back = '/education/view-professor';
          this.navigate = '/education/create-professor';
          break;
        case 'Student':
          this.getSpecStudent(this.id);
          this.back = '/education/view-student';
          this.navigate = '';

          break;
        default:
        // code block
      }
    }
  }
}
