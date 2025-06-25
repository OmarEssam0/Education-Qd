import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { MainToolbarComponent } from "../../../component/main-toolbar/main-toolbar.component";
import { TableModule } from 'primeng/table';
import { isPlatformBrowser } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HeaderTableData } from '../../../component/table/table.component';
import { StudentsService } from '../../../core/backend/dashboard/services';
import { AllStudentDto } from '../../../core/backend/dashboard/models/Education/Application/Dtos/all-student-dto';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-student',
  imports: [MainToolbarComponent,TableModule,IconFieldModule ,InputIconModule,FormsModule,RouterLink],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.scss'
})
export class ViewStudentComponent {
 isBrowser: boolean = true;
 searchInput!:string
 readonly #studentServices = inject(StudentsService)
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
   headerTableData: HeaderTableData[] = [
      { headerName: 'name', sorted: false },
      { headerName: 'email', sorted: false },
      { headerName: 'gpa', sorted: false },
      { headerName: 'major', sorted: false },
      { headerName: 'department', sorted: false },
    ];
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.getAllStudent()
    }
    allStudent:AllStudentDto[]=[]
    getAllStudent(){
      this.#studentServices.apiStudentsGetStudentsGet({}).subscribe({
        next: res => {
            this.allStudent = res.items!
        }
      })
    }
}
