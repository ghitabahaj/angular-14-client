import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes: any[] = [];

  constructor(private http: HttpClient) {}

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
}
