import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      return;
    }

    const email = this.resetForm.value.email;

    // Make an HTTP request to your backend API to reset the password
    this.http.post('http://your-api-url/reset-password', { email }).subscribe(
      (response) => {
        console.log('Password reset request successful');
        // Handle success response, e.g., display a success message
      },
      (error) => {
        console.error('Password reset request failed:', error);
        // Handle error response, e.g., display an error message
      }
    );
  }
}

