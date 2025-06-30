import { Component, inject, isDevMode } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import {
  CoursesService,
  ProfessorsService,
  StudentsService,
} from '../../../core/backend/dashboard/services';
import { CourseByCollegeIdResponseDto } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Courses/GetAllCoursesQuery/course-by-college-id-response-dto';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfessorByCourseResponseDto } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Professors/GetAllProfessorsByCourseQuery/professor-by-course-response-dto';
@Component({
  selector: 'app-create-student',
  imports: [
    ButtonModule,
    DatePickerModule,
    ToggleSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss',
})
export class CreateStudentComponent {
  StudentLevels = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
  ];
  Semester = ['One', 'Two', 'Summer'];
  CourseStatus = ['Ongoing', 'Completed', 'Withdraw', 'Failed'];
  loading: boolean = false;
  // id!: string;
  readonly #studentService = inject(StudentsService);
  readonly #professorService = inject(ProfessorsService);
  readonly #coursesService = inject(CoursesService);
  readonly #Route = inject(Router);
  constructor(
    private Route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Route.queryParamMap.subscribe({
    //   next: (data) => {
    //     this.id = data.get('id') ?? '';
    //   },
    // });
    // this.setValue();
  }

  // setValue() {
  //   this.#studentService
  //     .apiStudentsGetStudentGet({
  //       Id: this.id,
  //     })
  //     .subscribe({
  //       next: (res) => {
  //         this.createStudent.patchValue({
  //           id: this.id,
  //           Email: res.email,
  //           Name: res.name,
  //           studentCollegeId: res.studentCollegeId,
  //           gpa: res.gpa,
  //           department: res.department,
  //           major: res.major,
  //           levels: res.levels,
  //         });
  //         res.levels?.forEach((res) => {
  //           res.semesters?.forEach((x) => {
  //             x.courses?.forEach((c) => {
  //               if (c.professorCourse?.course?.id) {                  
  //                 this.getProfessorFromCourse(c.professorCourse?.course?.id);
  //               }
  //             });
  //           });
  //         });
  //       },
  //     });
  // }
  isBrowser = false;
  createStudent: FormGroup = new FormGroup({
    // id: new FormControl<string | undefined>(undefined),
    Email: new FormControl<string | undefined>(
      isDevMode() ? 'professor@gmail.com' : undefined,
      [Validators.required]
    ),
    Name: new FormControl<string | undefined>(
      isDevMode() ? 'professor' : undefined,
      [Validators.required]
    ),
    studentCollegeId: new FormControl<string | undefined>(
      isDevMode() ? '123' : undefined,
      [Validators.required]
    ),
    gpa: new FormControl<number | undefined>(isDevMode() ? 1.3 : undefined, [
      Validators.required,
    ]),
    department: new FormControl<string | undefined>(
      isDevMode() ? 'Information systems' : undefined,
      [Validators.required]
    ),
    major: new FormControl<string | undefined>(
      isDevMode() ? 'Information systems' : undefined,
      [Validators.required]
    ),
    levels: new FormArray([]),
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addlevel(0);
    this.getAllCourses();
  }

  get levels(): FormArray {
    return this.createStudent.get('levels') as FormArray;
  }

  addlevel(index: number) {
    const level = new FormGroup({
      levelNumber: new FormControl<number | undefined>(undefined, [
        Validators.required,
      ]),
      semesters: new FormArray([]),
    });
    this.levels.push(level);
    this.addSemester(index - 1);
  }

  getSemesters(levelIndex: number): FormArray {
    return this.levels.at(levelIndex).get('semesters') as FormArray;
  }
  addSemester(levelIndex: number) {
    const semester = new FormGroup({
      semester: new FormControl<string | undefined>(undefined, [
        Validators.required,
      ]),
      courses: new FormArray([]),
    });

    this.getSemesters(levelIndex).push(semester);
    this.addCourse(levelIndex, this.getSemesters(levelIndex).length - 1);
  }
  getCourses(levelIndex: number, semesterIndex: number): FormArray {
    return this.getSemesters(levelIndex)
      .at(semesterIndex)
      .get('courses') as FormArray;
  }
  addCourse(levelIndex: number, semesterIndex: number) {
    const course = new FormGroup({
      professorCourseId: new FormControl<string | undefined>(undefined),
      courseGrade: new FormControl<string | undefined>(undefined),
      courseStatus: new FormControl<string | undefined>(undefined),
    });

    this.getCourses(levelIndex, semesterIndex).push(course);
  }
  allCourses: CourseByCollegeIdResponseDto[] = [];
  getAllCourses() {
    this.#coursesService.apiCoursesGetAllCoursesGet().subscribe({
      next: (res) => {
        this.allCourses = res.courses!;
      },
    });
  }
  create() {
    console.log(this.createStudent.value);
    const BODY = this.createStudent.value;
    this.#studentService
      .apiStudentsCreateStudentPost({
        body: BODY,
      })
      .subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Student created success',
            icon: 'success',
          }).then((res) => {
            this.createStudent.reset();
            // this.#Route.navigate(['/education/view-student']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: err.error.title,
            icon: 'error',
          });
        },
      });
  }
  getAllProfessorCourse: ProfessorByCourseResponseDto[] = [];
  getProfessorFromCourse(courseId: string) {
    this.#professorService
      .apiProfessorsGetAllProfessorByCourseGet({
        CourseId: courseId,
      })
      .subscribe({
        next: (res) => {
          this.getAllProfessorCourse = res.professors!;
        },
      });
  }
}
