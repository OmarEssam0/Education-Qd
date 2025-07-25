import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main',
   imports: [RouterOutlet, CommonModule , ToolbarModule , SplitButtonModule , ButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  readonly #router = inject(Router) 
@Output() itemEvent:EventEmitter<boolean> = new EventEmitter
isLeftSidebarCollapsed = input.required<boolean>();
  screenWidth = input.required<number>();
  sizeClass = computed(() => {
    const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed();
    if (isLeftSidebarCollapsed) {
      return '';
    }
    return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  });

  closeLeftSideBarVar:boolean = false
  closeLeftSideBar(){
      this.closeLeftSideBarVar = !this.closeLeftSideBarVar     
      this.itemEvent.emit(this.closeLeftSideBarVar)  
  }
  logout(){
    localStorage.removeItem('token')
    this.#router.navigate(['/login'])
  }
}

