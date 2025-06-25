import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderTableData } from '../../../../component/table/table.component';
import { MainToolbarComponent } from '../../../../component/main-toolbar/main-toolbar.component';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { CoursesService } from '../../../../core/backend/dashboard/services';
import { CourseResponseDto } from '../../../../core/backend/dashboard/models/Education/Application/UseCases/Courses/GetCoursesQuery/course-response-dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-courses',
  imports: [
    MainToolbarComponent,
    TableModule,
    RatingModule,
    TagModule,
    ButtonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    RouterLink
  ],
  templateUrl: './view-courses.component.html',
  styleUrl: './view-courses.component.scss',
})
export class ViewCoursesComponent {
  isBrowser: boolean = true;
  searchInput!:string
  readonly #courseService = inject(CoursesService);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  headerTableData: HeaderTableData[] = [
    { headerName: 'Code', sorted: false },
    { headerName: 'Title', sorted: false },
  ];

  allCoruses: CourseResponseDto[] = [];
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.getAllCourses();
  }
  getAllCourses() {
    this.#courseService.apiCoursesGetCoursesGet({
      SearchTerm:this.searchInput
    }).subscribe({
      next: (res) => {
        this.allCoruses = res.items!;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      },
    });
  }
}
