import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public studentState: any = {
    students: [],
    keyword: "",
    totalStudents: 0,
    status: "",
    errorMessage: ""
  }

  public authState: any = {
    isAuthenticated: false,
    username: undefined,
    roles: undefined,
    token: undefined
  }

  constructor() { }

  public setStudentState(state: any): void {
    this.studentState = { ...this.studentState, ...state }
  }

  public updateStudentState(studentId: number, updatedStudent: any): void {
    const updatedStudents = this.studentState.students.map((student: any) => {
      if (student.id === studentId) {
        return { ...student, ...updatedStudent };
      }
      return student;
    });
    this.setStudentState({ students: updatedStudents });
  }

  public setAuthState(state: any): void {
    this.authState = { ...this.authState, ...state };
  }
}
