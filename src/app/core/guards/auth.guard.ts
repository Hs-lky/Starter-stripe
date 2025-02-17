import { Inject, Injectable, inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    canActivate(): boolean {
        if (!isPlatformBrowser(this.platformId)) {
            return true; // Allow access during SSR
        }

        if (this.authService.isAuthenticated()) {
            return true;
        }

        this.router.navigate(['/auth/login']);
        return false;
    }

    canActivateChild(): boolean {
        return this.canActivate();
    }
} 