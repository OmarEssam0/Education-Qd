import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CollegesService, CoursesService, ProfessorsService, StudentsService, UniversitiesService } from '../../../core/backend/dashboard/services';
import { GetUniversityResponse } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Universities/GetUniversityQuery/get-university-response';
import { GetCollegeResponse } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Colleges/GetCollegeQuery/get-college-response';
import { GetCourseResponse } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Courses/GetCourseQuery/get-course-response';
import { GetProfessorResponse } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Professors/GetProfessorQuery/get-professor-response';
import { GetStudentResponse } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Students/GetStudentQuery/get-student-response';

@Component({
  selector: 'app-detials',
  imports: [RouterLink],
  templateUrl: './detials.component.html',
  styleUrl: './detials.component.scss',
})
export class DetialsComponent {
  id: string = '';
  type: string | null = '';
  back:string | null = ''
  readonly #universityServices = inject(UniversitiesService);
  readonly #collegeServices = inject(CollegesService);
  readonly #courseServices = inject(CoursesService);
  readonly #studentServices = inject(StudentsService);
  readonly #professorServices = inject(ProfessorsService);
  constructor(private Route: ActivatedRoute) {
    Route.paramMap.subscribe({
      next: (data) => {
        this.id = data.get('id') ?? '';
        this.type = data.get('type');
      },
    });
    this.Route.queryParamMap.subscribe((params) => {
      this.type = params.get('type');
    })
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

  runCode() {
    if(this.type){
      switch (this.type) {
        case 'university':
          this.getSpecUniversty(this.id);
          this.back = '/education/viewUnversity'
          break;
        case 'college':
          this.getSpecCollege(this.id)
          this.back = '/education/viewCollege'
          break;
        case 'Course':
          this.getSpecCourse(this.id)
          this.back = '/education/view-courses'
          break;
        case 'Professor':
          this.getSpecProfessor(this.id)
          this.back = '/education/view-professor'
          break;
        case 'Student':
          this.getSpecStudent(this.id)
          this.back = '/education/view-student'
          break;
        default:
        // code block
      }
    }
  }
}
