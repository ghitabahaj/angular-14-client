import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { AppStateService } from "./app-state.service";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private refreshTokenTimer: any;
  private token: string | null = null;

  constructor(private http: HttpClient, private appState: AppStateService) {
    // Get the token from local storage during initialization
    this.token = localStorage.getItem('token');
  }

  async login(username: string, password: string) {
    try {
      const loginResponse = await firstValueFrom(this.http.post<any>("http://localhost:8089/login", {
        username: username,
        password: password
      }));

      const token = loginResponse.token;
      const refreshToken = loginResponse.refreshToken;
      const expirationDate = loginResponse.expirationDate;

      // Store the token, refresh token, and expiration date in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('expirationDate', expirationDate);

      // Set the token in the AuthService
      this.token = token;

      // Decode the JWT token to get the user details and roles
      const decodedJwt: any = jwtDecode(token);

      // Set the authentication state in the appState service
      this.appState.setAuthState({
        isAuthenticated: true,
        username: decodedJwt.sub,
        roles: decodedJwt.roles,
        token: token
      });

      // Start the token refresh timer
      this.startRefreshTokenTimer();

      return true; // Return true to indicate successful login
    } catch (error) {
      console.error(error);
      return Promise.reject("Login failed. Please check your credentials."); // Return error message for failed login
    }
  }

  logout() {
    // Clear the token, refresh token, and expiration date from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expirationDate');

    // Clear the token in the AuthService
    this.token = null;

    // Clear the authentication state in the appState service
    this.appState.setAuthState({
      isAuthenticated: false,
      username: undefined,
      roles: undefined,
      token: undefined
    });

    // Stop the token refresh timer
    this.stopRefreshTokenTimer();
  }

  startRefreshTokenTimer() {
    const expirationDate = localStorage.getItem('expirationDate');
    const expiresIn = new Date(expirationDate ?? '').getTime() - Date.now();

    this.refreshTokenTimer = setTimeout(() => {
      this.refreshToken();
    }, expiresIn);
  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimer);
  }

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      const refreshResponse = await firstValueFrom(this.http.post<any>("http://localhost:8089/refresh-token", {
        refreshToken: refreshToken
      }));

      const token = refreshResponse.token;
      const newExpirationDate = refreshResponse.expirationDate;

      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', newExpirationDate);

      // Set the token in the AuthService
      this.token = token;

      const decodedJwt: any = jwtDecode(token);

      this.appState.setAuthState({
        isAuthenticated: true,
        username: decodedJwt.sub,
        roles: decodedJwt.roles,
        token: token
      });

      this.startRefreshTokenTimer();
    } catch (error) {
      console.error(error);
      this.logout();
    }
  }

  isAuthenticated(): boolean {
    // Check if the token is present and not expired
    return !!this.token && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    const expirationDate = localStorage.getItem('expirationDate');
    if (expirationDate) {
      const expirationTimestamp = new Date(expirationDate).getTime();
      const currentTimestamp = Date.now();
      return expirationTimestamp < currentTimestamp;
    }
    return true;
  }
}
