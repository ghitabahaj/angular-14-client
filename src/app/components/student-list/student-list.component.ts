import { Component, OnInit } from '@angular/core';
import { Student } from "src/app/models/student.model";
import { StudentService } from 'src/app/services/student.service';
import {Router} from "@angular/router";
import {AppStateService} from "src/app/services/app-state.service";
import { Class } from 'src/app/models/class.model';

@Component({
  selector: 'app-students-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: Student[] = [];
  classes: Class[] = [];

  constructor(private studentService:StudentService,
    private router : Router , public appState : AppStateService) { }

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.studentService.fetchStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  handleDelete(student: Student) {
    if (confirm("Are you sure?")) {
      this.studentService.deleteStudent(student).subscribe(
        () => {
          console.log('Student deleted successfully');
          // You may want to refresh the student list after deletion
          this.fetchStudents();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  handleEdit(student: Student) {
    console.log("test");
    this.router.navigateByUrl(`editStudent/${student.id}`);
  }

  getClassById(classId: number): Class | undefined {
    return this.classes.find((c: Class) => c.id === classId);
  }
}
