import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  className: string = '';
  numberOfStudents: number | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  addClass() {
    if (!this.authService.isAuthenticated()) {
      // Token check failed, handle unauthorized access
      this.router.navigateByUrl('/login');
      return;
    }

    const classData = {
      className: this.className,
      numberOfStudents: this.numberOfStudents
    };

    this.http.post<any>('http://localhost:8089/classes', classData).subscribe(
      (response) => {
        // Class added successfully, navigate to the desired page
        this.router.navigateByUrl('/classes');
      },
      (error) => {
        console.error(error);
        // Handle error during class addition
      }
    );
  }
}

