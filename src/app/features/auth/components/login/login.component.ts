import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    // styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading = false;
    error: string | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.formBuilder.group({
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
        if (this.loginForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.error = null;

        this.authService.login(this.loginForm.value)
            .subscribe({
                next: () => {
                    this.router.navigate(['/dashboard']);
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