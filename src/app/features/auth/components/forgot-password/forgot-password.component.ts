import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    // styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup;
    isLoading = false;
    error: string | null = null;
    success = false;
    submittedEmail = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    get emailControl() {
        return this.forgotPasswordForm.get('email');
    }

    get emailError(): string {
        if (this.emailControl?.errors?.['required'] && this.emailControl.touched) {
            return 'L\'adresse e-mail est requise';
        }
        if (this.emailControl?.errors?.['email'] && this.emailControl.touched) {
            return 'Veuillez entrer une adresse e-mail valide';
        }
        return '';
    }

    onSubmit(): void {
        if (this.forgotPasswordForm.invalid) {
            this.forgotPasswordForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        this.error = null;
        const email = this.emailControl?.value;

        this.authService.forgotPassword(email)
            .subscribe({
                next: () => {
                    this.success = true;
                    this.submittedEmail = email;
                    this.isLoading = false;
                },
                error: (error) => {
                    this.error = error.error || 'Une erreur est survenue lors du traitement de votre demande';
                    this.isLoading = false;
                }
            });
    }

    tryAgain(): void {
        this.success = false;
        this.error = null;
        this.forgotPasswordForm.reset();
    }

    goToLogin(): void {
        this.router.navigate(['/auth/login']);
    }
} 