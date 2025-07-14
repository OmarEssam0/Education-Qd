import { Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { isPlatformBrowser } from '@angular/common';
import { UniveristyPublicDto } from '../../core/backend/dashboard/models/Education/Application/UseCases/Universities/GetUniversitiesQuery/univeristy-public-dto';
import { RouterLink } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
export interface HeaderTableData {
  headerName: string;
  sorted: boolean;
}
@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    RatingModule,
    TagModule,
    ButtonModule,
    FormsModule,
    IconFieldModule,
    RouterLink,
    InputIconModule,
    SkeletonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  isBrowser: boolean;
  isLoading = true;
  @Input() headerTableData!: HeaderTableData[];
  @Input() allUniversities!: UniveristyPublicDto[];
  // @Output() searchInput
  @Input() bodyTableData!: any[];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);    
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }
}
