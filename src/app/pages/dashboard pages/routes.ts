import { Routes } from "@angular/router";
import { CreateComponent } from "./create/create.component";
import { CreateCollegeComponent } from "./college pages/create-college/create-college.component";
import { ViewComponent } from "./view/view.component";
import { HomeComponent } from "./home/home.component";
import { ViewCollegeComponent } from "./college pages/view-college/view-college.component";
import { CreateProfessorComponent } from "./professor pages/create-professor/create-professor.component";
import { ViewProfessorsComponent } from "./professor pages/view-professors/view-professors.component";
import { CreateStudentComponent } from "./create-student/create-student.component";
import { CreateCoursesComponent } from "./courses pages/create-courses/create-courses.component";
import { ViewCoursesComponent } from "./courses pages/view-courses/view-courses.component";
import { ViewStudentComponent } from "./view-student/view-student.component";
import { ProfessorCoursesComponent } from "./professor-course/professor-courses/professor-courses.component";
import { ViewSpecCourseToProfessorComponent } from "./professor-course/view-spec-course-to-professor/view-spec-course-to-professor.component";
import { DetialsComponent } from "./detials/detials.component";

export const dashboardRoutes: Routes = [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'create', component: CreateComponent },
      { path: 'create-college', component: CreateCollegeComponent },
      { path: 'viewUnversity', component: ViewComponent },
      { path: 'viewUnversity/detials/:id', component: DetialsComponent },
      { path: 'viewCollege/detials/:id', component: DetialsComponent },
      { path: 'view-courses/detials/:id', component: DetialsComponent },
      { path: 'view-professor/detials/:id', component: DetialsComponent },
      { path: 'view-student/detials/:id', component: DetialsComponent },
      { path: 'dashboard', component: HomeComponent },
      { path: 'viewCollege', component: ViewCollegeComponent },
      { path: 'view-courses', component: ViewCoursesComponent },
      { path: 'view-professor', component: ViewProfessorsComponent },
      { path: 'view-student', component: ViewStudentComponent },
      { path: 'course-To-Professor', component: ProfessorCoursesComponent },
      { path: 'course-To-Professor/detials/:id', component: ViewSpecCourseToProfessorComponent },
      { path: 'create-professor', component: CreateProfessorComponent },
      { path: 'create-student', component: CreateStudentComponent },
      { path: 'create-courses', component: CreateCoursesComponent },
    ]