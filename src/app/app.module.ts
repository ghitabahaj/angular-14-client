import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { StudentsListComponent } from './components/student-list/student-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import {AppHttpInterceptor} from "./services/app-http.interceptor";
import { ReactiveFormsModule } from '@angular/forms';
import { EditStudentComponent } from './edit-student/edit-student.component';


@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    StudentsListComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    NavbarComponent,
    AddClassComponent,
    ClassListComponent,
    NotAuthorizedComponent,
    EditStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AppHttpInterceptor, multi : true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
