import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  fullName: string = '';
  cne: string = '';
  selectedClass: string = '';
  classes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

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
    const studentData = {
      fullName: this.fullName,
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
