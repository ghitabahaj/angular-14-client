import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './components/student-list/student-list.component';
import { StudentsDetailsComponent } from './components/student-details/student-details.component';
import { AddstudentComponent } from './components/add-student/add-student.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsListComponent },
  { path: 'students/:id', component: StudentsDetailsComponent },
  { path: 'add', component: AddstudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }