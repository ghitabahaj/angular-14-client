import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  handleRegister() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    // Make a POST request to the registration endpoint
    this.http.post<any>('http://localhost:8089/register', userData).subscribe(
      (response) => {
        // Registration successful, redirect to login page
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error(error);
        // Handle registration error here
      }
    );
  }
}
