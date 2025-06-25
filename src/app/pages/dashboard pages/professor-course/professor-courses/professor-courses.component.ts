import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { MainToolbarComponent } from '../../../../component/main-toolbar/main-toolbar.component';
import { isPlatformBrowser } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ProfessorsService } from '../../../../core/backend/dashboard/services';
import { ProfessorCoursesDto } from '../../../../core/backend/dashboard/models/Education/Application/UseCases/Professors/GetAllProfessorCoursesQuery/professor-courses-dto';
import { HeaderTableData } from '../../../../component/table/table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-professor-courses',
  imports: [
    MainToolbarComponent,
    TableModule,
    FormsModule,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
    RouterLink,
  ],
  templateUrl: './professor-courses.component.html',
  styleUrl: './professor-courses.component.scss',
})
export class ProfessorCoursesComponent {
  readonly #professorSevices = inject(ProfessorsService);
  searchInput!:string 
  first: number = 0;
  rows: number = 10;
  total!: number ;
  isBrowser: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  headerTableData: HeaderTableData[] = [
    { headerName: 'Code', sorted: false },
    { headerName: 'Title', sorted: false },
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllCourses({first:0});
  }
  AllCoursesToProfessor: ProfessorCoursesDto[] = [];
  getAllCourses(pageNumber:any) {
    let pageN = pageNumber.first + 1
    this.#professorSevices
      .apiProfessorsGetOwnProfessorCoursesGet({
        pageNumber:pageN,
        SearchTerm:this.searchInput
      })
      .subscribe({
        next: (res) => {
          this.AllCoursesToProfessor = res.items!;
          this.total = res.totalCount!
        },
      });
  }
}
