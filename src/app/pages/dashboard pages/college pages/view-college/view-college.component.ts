import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { MainToolbarComponent } from '../../../../component/main-toolbar/main-toolbar.component';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { isPlatformBrowser } from '@angular/common';
import { HeaderTableData } from '../../../../component/table/table.component';
import { CollegesService } from '../../../../core/backend/dashboard/services';
import { CollegePuplicDto } from '../../../../core/backend/dashboard/models/Education/Application/UseCases/Colleges/GetCollegesQuery/college-puplic-dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-college',
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
  templateUrl: './view-college.component.html',
  styleUrl: './view-college.component.scss',
})
export class ViewCollegeComponent {
  isBrowser: boolean;
  searchInput!:string
  readonly #collegeService = inject(CollegesService);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  headerTableData: HeaderTableData[] = [
    { headerName: 'Name', sorted: true },
    { headerName: 'Email', sorted: true },
    { headerName: 'Phone Number', sorted: false },
    { headerName: 'Web', sorted: false },
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllColleges();
  }
  allColleges: CollegePuplicDto[] = [];
  getAllColleges() {
    this.#collegeService.apiCollegesGetCollegesGet({
      SearchTerm:this.searchInput
    }).subscribe({
      next: (res) => {
        this.allColleges = res.items!;
      },
      error: (err) => {
        console.error('Error fetching colleges:', err);
      },
    });
  }
}
