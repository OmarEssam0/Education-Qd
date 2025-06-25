import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarItem } from './sidebar-items';
import { sidebarItem } from './sidebar-items';
import { AccountService } from '../../core/backend/Common/services';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule , RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class sidebarComponent {
isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  readonly #acountService = inject(AccountService)
  sidebarItem :SidebarItem[] = sidebarItem 
  currentUserRole!:string
  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCurrentUser()
  }

  getCurrentUser(){
    this.#acountService.apiAccountsGetProfilePost({}).subscribe({
      next:res =>{
        this.currentUserRole = res.userRole!
      }
    })
  }
}
