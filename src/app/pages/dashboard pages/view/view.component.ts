import { Component } from '@angular/core';
import { MainToolbarComponent } from "../../../component/main-toolbar/main-toolbar.component";
import { TableComponent } from "../../../component/table/table.component";

@Component({
  selector: 'app-view',
  imports: [MainToolbarComponent, TableComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {

}
