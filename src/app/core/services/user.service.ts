import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserResponse, User } from '../models/user.model';
 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {}

  getUsers(page: number = 0, size: number = 20, search?: string, role?: string, status?: string): Observable<UserResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString()
    });

    if (search) params.append('search', search);
    if (role) params.append('role', role);
    if (status) params.append('status', status);

    return this.http.get<UserResponse>(`${this.apiUrl}/users?${params.toString()}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  getUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userData);
  }

  updatePassword(userId: number, currentPassword: string, newPassword: string, confirmPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${userId}/password`, {
      currentPassword,
      newPassword,
      confirmPassword
    });
  }
} 