import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule , RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class sidebarComponent {
isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'dashboard',
      icon: 'fa-solid fa-house',
      label: 'Dashboard',
    },
    {
      routeLink: 'products',
      icon: 'fa-solid fa-user-plus',
      label: 'create university',
    },
    {
      routeLink: 'pages',
      icon: 'fa-solid fa-building-columns',
      label: 'view All University',
    },
    {
      routeLink: 'settings',
      icon: 'fal fa-cog',
      label: 'Settings',
    },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
