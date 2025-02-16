import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    // styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm: FormGroup;
    isLoading = false;
    error: string | null = null;
    success: string | null = null;
    token: string | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]]
        }, { validator: this.passwordMatchValidator });
    }

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('token');
        if (!this.token) {
            this.error = 'Invalid password reset token';
        }
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null
            : { mismatch: true };
    }

    onSubmit(): void {
        if (this.resetPasswordForm.invalid || !this.token) {
            return;
        }

        this.isLoading = true;
        this.error = null;
        this.success = null;

        this.authService.resetPassword(this.token, this.resetPasswordForm.get('password')?.value)
            .subscribe({
                next: () => {
                    this.success = 'Your password has been reset successfully.';
                    this.isLoading = false;
                    setTimeout(() => {
                        this.router.navigate(['/auth/login']);
                    }, 3000);
                },
                error: (error) => {
                    this.error = error.error || 'An error occurred while resetting your password';
                    this.isLoading = false;
                }
            });
    }
} 