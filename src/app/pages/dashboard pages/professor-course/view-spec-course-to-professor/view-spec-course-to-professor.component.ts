import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfessorsService } from '../../../../core/backend/dashboard/services';
import { GetOwnProfessorCourseResponse } from '../../../../core/backend/dashboard/models/Education/Application/UseCases/Professors/GetOwnProfessorCourseQuery/get-own-professor-course-response';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-view-spec-course-to-professor',
  imports: [RouterLink, ButtonModule, FormsModule],
  templateUrl: './view-spec-course-to-professor.component.html',
  styleUrl: './view-spec-course-to-professor.component.scss',
})
export class ViewSpecCourseToProfessorComponent {
  id!: string;
  loading: boolean = false;
  CourseFiles!: Blob[];
  readonly #professorServices = inject(ProfessorsService);
  readonly #Route = inject(Router);
  constructor(private Route: ActivatedRoute) {
    if (Route.snapshot.paramMap.get('id') != null) {
      this.id = Route.snapshot.paramMap.get('id') ?? '';
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getSpecProfessorCourse();
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      console.log('No files selected.');
      return;
    }

    const files = Array.from(input.files);
    const pdfFiles = files.filter((file) => file.type === 'application/pdf');

    if (pdfFiles.length === 0) {
      alert('Please upload only PDF files.');
      return;
    }

    // تحويل File إلى Blob صريح
    this.CourseFiles = pdfFiles.map(
      (file) => new Blob([file], { type: file.type })
    );
  }

  SpecProfessorCourse!: GetOwnProfessorCourseResponse;
  getSpecProfessorCourse() {
    this.#professorServices
      .apiProfessorsGetOwnProfessorCourseGet({
        ProfessorCourseId: this.id,
      })
      .subscribe({
        next: (res) => {
          this.SpecProfessorCourse = res;
        },
        error: (err) => {
          Swal.fire({
            title: 'Something error',
            icon: 'error',
          });
        },
      });
  }

  UploadContent() {
    this.loading = true;
    this.#professorServices
      .apiProfessorsUploadContentProfessorCoursePatch({
        body: {
          ProfessorCourseId: this.id,
          CourseFiles: this.CourseFiles,
        },
      })
      .subscribe({
        next: (res) => {
          this.loading = false;
          Swal.fire({
            title: 'Content Uploaded Success',
            icon: 'success',
          }).then((x) => {
            this.#Route.navigate(['education/course-To-Professor']);
          });
        },
        error: (err) => {
          this.loading = false;
          Swal.fire({
            title: 'Something Error',
            icon: 'error',
          });
        },
      });
  }
}
