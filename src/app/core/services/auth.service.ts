import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/auth.models';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = `${environment.apiUrl}/auth`;
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();
    private isBrowser: boolean;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            this.loadUserFromStorage();
        }
    }

    private loadUserFromStorage(): void {
        if (!this.isBrowser) return;
        
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            try {
                this.currentUserSubject.next(JSON.parse(user));
            } catch (e) {
                console.error('Error parsing user from storage:', e);
                this.logout();
            }
        }
    }

    register(request: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/register`, request)
            .pipe(
                tap(response => this.handleAuthResponse(response))
            );
    }

    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, request)
            .pipe(
                tap(response => this.handleAuthResponse(response))
            );
    }

    verifyEmail(token: string): Observable<string> {
        return this.http.get<string>(`${this.API_URL}/verify-email?token=${token}`);
    }

    resendVerificationEmail(email: string): Observable<string> {
        return this.http.post<string>(`${this.API_URL}/resend-verification`, null, {
            params: { email }
        });
    }

    forgotPassword(email: string): Observable<string> {
        return this.http.post<string>(`${this.API_URL}/forgot-password`, null, {
            params: { email }
        });
    }

    resetPassword(token: string, newPassword: string): Observable<string> {
        return this.http.post<string>(`${this.API_URL}/reset-password`, null, {
            params: { token, newPassword }
        });
    }

    logout(): void {
        if (this.isBrowser) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        this.currentUserSubject.next(null);
    }

    private handleAuthResponse(response: AuthResponse): void {
        if (response && response.token && this.isBrowser) {
            localStorage.setItem('token', response.token);
            const user: User = {
                id: response.id,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                roles: response.roles,
                enabled: response.enabled
            };
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }
    }

    isLoggedIn(): boolean {
        return !!this.currentUserSubject.value;
    }

    getToken(): string | null {
        if (!this.isBrowser) return null;
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        if (!this.isBrowser) {
            return false; // Return false when running on server
        }
        const token = localStorage.getItem('token');
        return !!token;
    }
} 