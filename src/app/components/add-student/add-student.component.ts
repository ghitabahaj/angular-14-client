import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  name: string = '';
  cne: string = '';
  selectedClass: string = '';
  classes: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchClasses();
  }

  fetchClasses() {
    this.http.get<any[]>('http://localhost:8089/classes').subscribe(
      (response) => {
        this.classes = response;
      },
      (error) => {
        console.error(error);
        // Handle error when fetching classes
      }
    );
  }

  addStudent() {
    if (!this.authService.isAuthenticated()) {
      // Token check failed, handle unauthorized access
      this.router.navigateByUrl('/login');
      return;
    }

    const studentData = {
      fullName: this.name,
      cne: this.cne,
      selectedClass: this.selectedClass
    };

    this.http.post<any>('http://localhost:8089/students', studentData).subscribe(
      (response) => {
        // Student added successfully, navigate to the desired page
        this.router.navigateByUrl('/students');
      },
      (error) => {
        console.error(error);
        // Handle error when adding student
      }
    );
  }
}

