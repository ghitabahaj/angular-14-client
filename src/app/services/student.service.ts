import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student } from "src/app/models/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private host: string = "http://localhost:8089";
  private apiUrl = `${this.host}/students`;

  constructor(private http: HttpClient) { }

  fetchStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  deleteStudent(student: Student): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${student.id}`);
  }

  saveStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${studentId}`);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student);
  }
}

