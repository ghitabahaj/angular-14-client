import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './components/student-list/student-list.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AuthGuard } from 'src/app/guards/auth.guard';



const routes: Routes = [
  { path: "login", component: LoginComponent , data: { navbarVisible: false }},
  { path: 'students', component: StudentsListComponent, canActivate: [AuthGuard]},
  { path: 'editStudent/:id', component: EditStudentComponent, canActivate: [AuthGuard]},
  { path: 'add', component: AddStudentComponent , canActivate: [AuthGuard]  },
  { path: 'addClass', component: AddClassComponent, canActivate: [AuthGuard] },
  { path: 'classes', component: ClassListComponent, canActivate: [AuthGuard] },
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