import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentId!: number;
  studentFormGroup!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.params['id'];
    this.studentService.getStudentById(this.studentId).subscribe(
      (student: Student) => {
        this.studentFormGroup = this.fb.group({
          id: [student.id],
          name: [student.name, Validators.required],
          cne: [student.cne, Validators.required],
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateStudent() {
    if (this.studentFormGroup.valid) {
      const student: Student = this.studentFormGroup.value;
      this.studentService.updateStudent(student).subscribe(
        (data: any) => {
          alert('Student updated successfully');
        },
        (error: any) => {
          console.error(error);
          alert('Failed to update student');
        }
      );
    }
  }
}
