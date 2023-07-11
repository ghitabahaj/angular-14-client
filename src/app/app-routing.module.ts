import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './components/student-list/student-list.component';
import { AddstudentComponent } from './components/add-student/add-student.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: 'students', component: StudentsListComponent
  },
  { path: 'add', component: AddstudentComponent },
  { path: 'addClass', component: AddClassComponent },
  { path: 'classes', component: ClassListComponent },
  { path: 'login', component: LoginComponent, data: { navbarVisible: false } },
  { path: 'register', component: RegisterComponent, data: { navbarVisible: false } },
  { path: 'reset-password', component: ResetPasswordComponent, data: { navbarVisible: false } },
  { path: 'notAuthorized', component: NotAuthorizedComponent },
  { path: "", redirectTo: "login", pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }