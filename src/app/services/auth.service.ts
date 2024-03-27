import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // Mock authentication logic, replace with actual authentication logic
  login(username: string, password: string): boolean {
    // Example: Check if username and password match
    if (username === 'user@gmail.com' && password === 'password') {
      // Mock successful login
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    } else {
      // Mock unsuccessful login
      return false;
    }
  }

  logout(): void {
    // Mock logout
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    // Check if user is logged in
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('isLoggedIn');
    return !!token; 
  }
}
