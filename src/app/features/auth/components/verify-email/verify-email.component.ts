import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    // styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
    isLoading = false;
    error: string | null = null;
    success: string | null = null;
    email: string | null = null;
    token: string | null = null;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('token');
        this.email = this.route.snapshot.queryParamMap.get('email');

        if (this.token) {
            this.verifyEmail();
        }
    }

    verifyEmail(): void {
        if (!this.token) {
            return;
        }

        this.isLoading = true;
        this.error = null;
        this.success = null;

        this.authService.verifyEmail(this.token)
            .subscribe({
                next: () => {
                    this.success = 'Email vérifié avec succès. Vous pouvez maintenant vous connecter.';
                    this.isLoading = false;
                    setTimeout(() => {
                        this.router.navigate(['/auth/login']);
                    }, 3000);
                },
                error: (error) => {
                    this.error = error.error || 'Une erreur est survenue lors de la vérification de votre email';
                    this.isLoading = false;
                }
            });
    }

    resendVerification(): void {
        if (!this.email) {
            return;
        }

        this.isLoading = true;
        this.error = null;
        this.success = null;

        this.authService.resendVerificationEmail(this.email)
            .subscribe({
                next: () => {
                    this.success = 'L\'email de vérification a été renvoyé. Veuillez vérifier votre boîte de réception.';
                    this.isLoading = false;
                },
                error: (error) => {
                    this.error = error.error || 'Une erreur est survenue lors du renvoi de l\'email de vérification';
                    this.isLoading = false;
                }
            });
    }
} 