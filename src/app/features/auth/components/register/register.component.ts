import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    // styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    isLoading = false;
    error: string | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.error = null;

        this.authService.register(this.registerForm.value)
        .subscribe({
            next: () => {
                this.router.navigate(['/auth/verify-email'], {
                    queryParams: { email: this.registerForm.get('email')?.value }
                });
            },
            error: (error) => {
                console.log('Full error response:', error);
                this.isLoading = false;
                this.handleErrorResponse(error);
            }
        });
    }

    private handleErrorResponse(error: any): void {
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            this.error = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            try {
                // Access the error response directly
                const errorBody = error.error;

                // Log the error body in JSON format
                console.log('Parsed error body:', JSON.stringify(errorBody, null, 2));

                // Display the message from the error response
                this.error = errorBody?.message || 'Une erreur est survenue lors de l\'inscription';
            } catch (e) {
                this.error = 'Une erreur est survenue lors de l\'inscription';
            }
        }
    }
} 