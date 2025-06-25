import { ROLES } from '../app-const';

export interface SidebarItem {
    routeLink: string,
      icon: string,
      label: string,
      Role: any,
}

export const sidebarItem  = [    
    {
      routeLink: 'dashboard',
      icon: 'fa-solid fa-house',
      label: 'Dashboard',
      Role: [ROLES.SUPER_ADMIN, ROLES.UNIVERSITY, ROLES.COLLEGE_ADMIN, ROLES.PROFESSOR],
    },
    {
      routeLink: 'create',
      icon: 'fa-solid fa-user-plus',
      label: 'Create university',
      Role: [ROLES.SUPER_ADMIN],
    },
    {
      routeLink: 'create-college',
      icon: 'fa-solid fa-user-plus',
      label: 'Create college',
      Role: [ROLES.UNIVERSITY],
    },
    {
      routeLink: 'create-professor',
      icon: 'fa-solid fa-person-circle-plus',
      label: 'Create professor',
      Role: [ROLES.COLLEGE_ADMIN],
    },
    {
      routeLink: 'create-student',
      icon: 'fa-solid fa-user-plus',
      label: 'Create student',
      Role: [ROLES.COLLEGE_ADMIN],
    },
    {
      routeLink: 'create-courses',
      icon: 'fa-solid fa-circle-plus',
      label: 'Create course',
      Role: [ROLES.COLLEGE_ADMIN],
    },
    {
      routeLink: 'viewUnversity',
      icon: 'fa-solid fa-building-columns',
      label: 'View all university',
      Role: [ROLES.SUPER_ADMIN],
    },
    {
      routeLink: 'view-courses',
      icon: 'fa-solid fa-book',
      label: 'View all courses',
      Role: [ ROLES.COLLEGE_ADMIN],
    },
    {
      routeLink: 'viewCollege',
      icon: 'fa-solid fa-graduation-cap',
      label: 'View all colleges',
      Role: [ ROLES.UNIVERSITY],
    },
    {
      routeLink: 'view-professor',
      icon: 'fa-solid fa-user-tie',
      label: 'View all professor',
      Role: [ ROLES.COLLEGE_ADMIN],

    },
    {
      routeLink: 'course-To-Professor',
      icon: 'fa-solid fa-graduation-cap',
      label: 'All Courses',
      Role: [ ROLES.PROFESSOR],

    },
    {
      routeLink: 'view-student',
      icon: 'fa-solid fa-graduation-cap',
      label: 'View all students',
      Role: [ ROLES.COLLEGE_ADMIN],

    },
  ];