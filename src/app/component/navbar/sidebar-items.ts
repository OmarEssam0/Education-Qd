export interface SidebarItem {
    routeLink: string,
      icon: string,
      label: string,
}

export const sidebarItem  = [    
    {
      routeLink: 'dashboard',
      icon: 'fa-solid fa-house',
      label: 'Dashboard',
    },
    {
      routeLink: 'create',
      icon: 'fa-solid fa-user-plus',
      label: 'Create university',
    },
    {
      routeLink: 'viewUnversity',
      icon: 'fa-solid fa-building-columns',
      label: 'View all university',
    },
    {
      routeLink: 'pages',
      icon: 'fa-solid fa-graduation-cap',
      label: 'View all colleges',
    },
    {
      routeLink: 'pages',
      icon: 'fa-solid fa-user-tie',
      label: 'View all professor',
    },
  ];