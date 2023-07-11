import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './components/student-list/student-list.component';
import { StudentsDetailsComponent } from './components/student-details/student-details.component';
import { AddstudentComponent } from './components/add-student/add-student.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddClassComponent } from './components/add-class/add-class.component';


const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsListComponent },
  { path: 'students/:id', component: StudentsDetailsComponent },
  { path: 'add', component: AddstudentComponent },
  { path: 'addClass', component: AddClassComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent , data: { navbarVisible: false }},
  { path: 'register', component: RegisterComponent, data: { navbarVisible: false } },
  { path: 'reset-password', component: ResetPasswordComponent , data: { navbarVisible: false }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }