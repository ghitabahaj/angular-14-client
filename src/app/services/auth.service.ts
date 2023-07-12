import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { AppStateService } from "./app-state.service";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private appState: AppStateService) { }

  async login(username: string, password: string) {
    try {
      // Make a POST request to the login endpoint with the username and password
      const loginResponse = await firstValueFrom(this.http.post<any>("http://localhost:8089/login", {
        username: username,
        password: password
      }));

      // Extract the JWT token from the login response
      const token = loginResponse.token;

      // Decode the JWT token to get the user details and roles
      const decodedJwt: any = jwtDecode(token);

      // Set the authentication state in the appState service
      this.appState.setAuthState({
        isAuthenticated: true,
        username: decodedJwt.sub,
        roles: decodedJwt.roles,
        token: token
      });

      return true; // Return true to indicate successful login
    } catch (error) {
      console.error(error);
      return Promise.reject("Login failed. Please check your credentials."); // Return error message for failed login
    }
  }
}
