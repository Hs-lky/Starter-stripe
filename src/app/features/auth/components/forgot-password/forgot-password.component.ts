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
    success: string | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit(): void {
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.error = null;
        this.success = null;

        this.authService.forgotPassword(this.forgotPasswordForm.get('email')?.value)
            .subscribe({
                next: () => {
                    this.success = 'Les instructions de réinitialisation du mot de passe ont été envoyées à votre email.';
                    this.isLoading = false;
                },
                error: (error) => {
                    this.error = error.error || 'Une erreur est survenue lors du traitement de votre demande';
                    this.isLoading = false;
                }
            });
    }
} 