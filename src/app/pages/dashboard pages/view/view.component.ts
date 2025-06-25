import { Component, inject } from '@angular/core';
import { MainToolbarComponent } from '../../../component/main-toolbar/main-toolbar.component';
import {
  HeaderTableData,
  TableComponent,
} from '../../../component/table/table.component';
import { UniversitiesService } from '../../../core/backend/dashboard/services';
import { UniveristyPublicDto } from '../../../core/backend/dashboard/models/Education/Application/UseCases/Universities/GetUniversitiesQuery/univeristy-public-dto';
@Component({
  selector: 'app-view',
  imports: [MainToolbarComponent, TableComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  tableHeaderData: HeaderTableData[] = [
    { headerName: 'Name', sorted: true },
    { headerName: 'Email', sorted: true },
    { headerName: 'Phone Number', sorted: false },
    { headerName: 'Paid Until', sorted: false },
    { headerName: 'isPaid', sorted: false },
    { headerName: 'Web', sorted: false },
    // { headerName: 'description', sorted: false },
  ];

  tableBodyData:any = [
      "id",
      "name",
      "email",
      "description",
      "phoneNumber",
      "address",
      "webAddress",
    ];
  

  readonly #unversitieService = inject(UniversitiesService);
  allUniversities!: UniveristyPublicDto[];

  ngOnInit(): void {
    this.getAllUniversities();
  }

  getAllUniversities() {
    this.#unversitieService.apiUniversitiesGetUniversitiesGet().subscribe({
      next: (res) => {
        this.allUniversities = res.items!;
      },
      error: (err) => {
        console.error('Error fetching universities:', err);
      }
    });
  }
}
