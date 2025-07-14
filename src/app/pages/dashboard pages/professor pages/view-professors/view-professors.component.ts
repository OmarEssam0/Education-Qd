import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { MainToolbarComponent } from '../../../../component/main-toolbar/main-toolbar.component';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { HeaderTableData } from '../../../../component/table/table.component';
import { isPlatformBrowser } from '@angular/common';
import { CoursesService, ProfessorsService } from '../../../../core/backend/dashboard/services';
import { ProfessorCoursesDto } from '../../../../core/backend/dashboard/models/Education/Application/UseCases/Professors/GetAllProfessorCoursesQuery/professor-courses-dto';
import { ProfessorDto } from '../../../../core/backend/dashboard/models/Education/Application/Dtos/professor-dto';
import Swal from 'sweetalert2';
import { DialogModule } from 'primeng/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { CourseByCollegeIdResponseDto } from '../../../../core/backend/dashboard/models/Education/Application/UseCases/Courses/GetAllCoursesQuery/course-by-college-id-response-dto';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-view-professors',
  imports: [
    MainToolbarComponent,
    TableModule,
    RatingModule,
    TagModule,
    ButtonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './view-professors.component.html',
  styleUrl: './view-professors.component.scss',
})
export class ViewProfessorsComponent {
  isBrowser!: boolean;
  searchInput!:string
  readonly #professorService = inject(ProfessorsService);
  readonly #coursesService = inject(CoursesService);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  headerTableData: HeaderTableData[] = [
    { headerName: 'Name', sorted: false },
    { headerName: 'Email', sorted: false },
    { headerName: 'Assign to course', sorted: false },
  ];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProfessors();
    this.getAllCourses()
  }
  AllProfessors: ProfessorDto[] = [];
  getAllProfessors() {
    this.#professorService.apiProfessorsGetProfessorsGet({
      SearchTerm:this.searchInput
    }).subscribe({
      next: (res) => {
        this.AllProfessors = res.items!;
      },
      error: (err) => {
        console.error('Error fetching professors:', err);
      },
    });
  }
  AssignCourse: FormGroup = new FormGroup({
    professorId: new FormControl<string | undefined>(undefined),
    coursesIds: new FormControl<string | undefined>(undefined),
  });

  assignCouresToProfessor() {
    const BODY = this.AssignCourse.value;
    this.#professorService
      .apiProfessorsAssignProfessorToCoursesPatch({
        body: BODY,
      })
      .subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Courses Assign Success',
            icon: 'success',
          }).then((res) => {
            this.ngOnInit();
            this.visible =false
            this.AssignCourse.reset()
          });
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: err.error,
            icon: 'error',
          }).then((res) => {
            this.ngOnInit();
          });
        },
      });
  }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
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
