import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50/50 p-4 lg:p-8">
      <!-- Header with Gradient Background -->
      <div class="relative mb-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 overflow-hidden">
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div class="relative">
          <h1 class="text-2xl lg:text-3xl font-bold text-white mb-2">Mon Profil</h1>
          <p class="text-primary-100">Gérez vos informations personnelles et les paramètres de votre compte</p>
        </div>
      </div>

      <!-- Profile Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Information -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Profile Card -->
          <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div class="border-b border-gray-100 px-8 py-6">
              <h2 class="text-xl font-semibold text-gray-900">Informations du Profil</h2>
              <p class="text-sm text-gray-500 mt-1">Mettez à jour vos informations personnelles et votre photo de profil</p>
            </div>
            
            <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="p-8">
              <div class="space-y-8">
                <!-- Profile Picture Section -->
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div class="relative group">
                    <div class="h-24 w-24 rounded-2xl bg-gray-100 overflow-hidden ring-4 ring-white shadow-sm">
                      <img class="h-full w-full object-cover" 
                           [src]="'https://ui-avatars.com/api/?name=' + userForm.get('firstName')?.value + '+' + userForm.get('lastName')?.value + '&background=6366f1&color=fff'" 
                           [alt]="userForm.get('firstName')?.value + ' ' + userForm.get('lastName')?.value">
                    </div>
                    <button type="button" 
                            class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                      <span class="text-white text-sm font-medium">Modifier</span>
                    </button>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-medium text-gray-900 mb-1">Photo de Profil</h3>
                    <p class="text-sm text-gray-500 mb-4">Téléchargez une nouvelle photo de profil ou un avatar</p>
                    <div class="flex gap-3">
                      <button type="button" 
                              class="px-4 py-2 bg-primary-50 text-primary-600 rounded-xl text-sm font-medium
                                     hover:bg-primary-100 transition-colors duration-200">
                        Télécharger Photo
                      </button>
                      <button type="button" 
                              class="px-4 py-2 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50
                                     transition-colors duration-200">
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Form Fields -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- First Name -->
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Prénom</label>
                    <div class="relative">
                      <input type="text" 
                             formControlName="firstName"
                             class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500
                                    focus:ring focus:ring-primary-500/20 transition-all duration-200
                                    placeholder-gray-400"
                             placeholder="Entrez votre prénom">
                      @if (userForm.get('firstName')?.errors?.['required'] && userForm.get('firstName')?.touched) {
                        <p class="mt-1 text-sm text-red-500">
                          <i class="fas fa-exclamation-circle mr-1"></i>
                          Le prénom est requis
                        </p>
                      }
                    </div>
                  </div>

                  <!-- Last Name -->
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Nom</label>
                    <div class="relative">
                      <input type="text" 
                             formControlName="lastName"
                             class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500
                                    focus:ring focus:ring-primary-500/20 transition-all duration-200
                                    placeholder-gray-400"
                             placeholder="Entrez votre nom">
                      @if (userForm.get('lastName')?.errors?.['required'] && userForm.get('lastName')?.touched) {
                        <p class="mt-1 text-sm text-red-500">
                          <i class="fas fa-exclamation-circle mr-1"></i>
                          Le nom est requis
                        </p>
                      }
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="space-y-2 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Adresse Email</label>
                    <div class="relative">
                      <input type="email" 
                             formControlName="email"
                             class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500
                                    focus:ring focus:ring-primary-500/20 transition-all duration-200
                                    placeholder-gray-400"
                             placeholder="Entrez votre adresse email">
                      @if (userForm.get('email')?.errors?.['required'] && userForm.get('email')?.touched) {
                        <p class="mt-1 text-sm text-red-500">
                          <i class="fas fa-exclamation-circle mr-1"></i>
                          L'email est requis
                        </p>
                      }
                      @if (userForm.get('email')?.errors?.['email'] && userForm.get('email')?.touched) {
                        <p class="mt-1 text-sm text-red-500">
                          <i class="fas fa-exclamation-circle mr-1"></i>
                          Veuillez entrer une adresse email valide
                        </p>
                      }
                    </div>
                  </div>
                </div>

                <!-- Messages -->
                @if (errorMessage) {
                  <div class="p-4 bg-red-50 text-red-500 rounded-xl flex items-center">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    {{errorMessage}}
                  </div>
                }

                @if (successMessage) {
                  <div class="p-4 bg-green-50 text-green-500 rounded-xl flex items-center">
                    <i class="fas fa-check-circle mr-2"></i>
                    {{successMessage}}
                  </div>
                }

                <!-- Submit Button -->
                <div class="flex justify-end">
                  <button type="submit"
                          [disabled]="userForm.invalid || userForm.pristine"
                          class="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium
                                 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500
                                 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50
                                 disabled:cursor-not-allowed disabled:hover:bg-primary-600
                                 flex items-center gap-2">
                    <i class="fas fa-save"></i>
                    Enregistrer les Modifications
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Account Settings Sidebar -->
        <div class="space-y-8">
          <!-- Password Change Card -->
          <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div class="border-b border-gray-100 px-6 py-4">
              <h2 class="text-lg font-semibold text-gray-900">Changer le Mot de Passe</h2>
            </div>
            
            <form [formGroup]="passwordForm" (ngSubmit)="onPasswordSubmit()" class="p-6">
              <div class="space-y-4">
                <!-- Current Password -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Mot de Passe Actuel</label>
                  <div class="relative">
                    <input type="password" 
                           formControlName="currentPassword"
                           class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500
                                  focus:ring focus:ring-primary-500/20 transition-all duration-200
                                  placeholder-gray-400"
                           placeholder="Entrez le mot de passe actuel">
                  </div>
                </div>

                <!-- New Password -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Nouveau Mot de Passe</label>
                  <div class="relative">
                    <input type="password" 
                           formControlName="newPassword"
                           class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500
                                  focus:ring focus:ring-primary-500/20 transition-all duration-200
                                  placeholder-gray-400"
                           placeholder="Entrez le nouveau mot de passe">
                  </div>
                </div>

                <!-- Confirm Password -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Confirmer le Nouveau Mot de Passe</label>
                  <div class="relative">
                    <input type="password" 
                           formControlName="confirmPassword"
                           class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500
                                  focus:ring focus:ring-primary-500/20 transition-all duration-200
                                  placeholder-gray-400"
                           placeholder="Confirmez le nouveau mot de passe">
                  </div>
                </div>

                <!-- Password Messages -->
                @if (passwordErrorMessage) {
                  <div class="p-3 bg-red-50 text-red-500 rounded-xl text-sm flex items-center">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    {{passwordErrorMessage}}
                  </div>
                }

                @if (passwordSuccessMessage) {
                  <div class="p-3 bg-green-50 text-green-500 rounded-xl text-sm flex items-center">
                    <i class="fas fa-check-circle mr-2"></i>
                    {{passwordSuccessMessage}}
                  </div>
                }

                <!-- Submit Button -->
                <button type="submit"
                        [disabled]="passwordForm.invalid || passwordForm.pristine"
                        class="w-full px-4 py-3 bg-primary-600 text-white rounded-xl font-medium
                               hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500
                               focus:ring-offset-2 transition-all duration-200 disabled:opacity-50
                               disabled:cursor-not-allowed disabled:hover:bg-primary-600
                               flex items-center justify-center gap-2">
                  <i class="fas fa-key"></i>
                  Mettre à Jour le Mot de Passe
                </button>
              </div>
            </form>
          </div>

          <!-- Account Status Card -->
          <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div class="border-b border-gray-100 px-6 py-4">
              <h2 class="text-lg font-semibold text-gray-900">État du Compte</h2>
            </div>
            
            <div class="p-6 space-y-6">
              <!-- Status -->
              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <p class="text-sm text-gray-500">État du Compte</p>
                  <div class="flex items-center gap-2">
                    <span class="flex h-2.5 w-2.5 rounded-full"
                          [class]="user?.enabled ? 'bg-green-500' : 'bg-red-500'"></span>
                    <p class="text-sm font-medium text-gray-900">
                      {{user?.enabled ? 'Actif' : 'Inactif'}}
                    </p>
                  </div>
                </div>
                <span class="px-3 py-1 text-xs font-semibold rounded-full"
                      [class]="getStatusBadgeClass(user?.enabled || false)">
                  {{user?.enabled ? 'Vérifié' : 'Non Vérifié'}}
                </span>
              </div>

              <!-- Last Login -->
              <div class="space-y-1">
                <p class="text-sm text-gray-500">Dernière Connexion</p>
                <p class="text-sm font-medium text-gray-900">
                  <i class="fas fa-clock text-gray-400 mr-2"></i>
                  {{ user?.lastLoginDate ? (user?.lastLoginDate | date:'medium') : 'Jamais' }}
                </p>
              </div>

              <!-- Roles -->
              <div class="space-y-2">
                <p class="text-sm text-gray-500">Rôles Utilisateur</p>
                <div class="flex flex-wrap gap-2">
                  @for (role of user?.roles || []; track role) {
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                          [class]="getRoleBadgeClass(role)">
                      <i class="fas fa-shield-alt mr-1.5"></i>
                      {{role.replace('ROLE_', '')}}
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserManagementComponent implements OnInit {
  user: User | null = null;
  userForm: FormGroup;
  passwordForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  passwordErrorMessage = '';
  passwordSuccessMessage = '';
  isBrowser: boolean;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      },
      error: (error) => {
        this.errorMessage = 'Error loading profile';
        console.error('Error loading user profile:', error);
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid && this.user) {
      this.userService.updateUser(this.user.id, this.userForm.value).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.successMessage = 'Profile updated successfully';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error updating profile';
        }
      });
    }
  }

  onPasswordSubmit() {
    if (this.passwordForm.valid && this.user) {
      const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;
      this.userService.updatePassword(this.user.id, currentPassword, newPassword, confirmPassword).subscribe({
        next: () => {
          this.passwordSuccessMessage = 'Password updated successfully';
          this.passwordForm.reset();
          setTimeout(() => this.passwordSuccessMessage = '', 3000);
        },
        error: (error) => {
          this.passwordErrorMessage = error.error.message || 'Error updating password';
        }
      });
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  getRoleBadgeClass(role: string): string {
    const baseClasses = 'bg-opacity-10 ';
    switch (role) {
      case 'ROLE_ADMIN':
        return baseClasses + 'bg-purple-500 text-purple-800';
      case 'ROLE_USER':
        return baseClasses + 'bg-blue-500 text-blue-800';
      default:
        return baseClasses + 'bg-gray-500 text-gray-800';
    }
  }

  getStatusBadgeClass(enabled: boolean): string {
    const baseClasses = 'bg-opacity-10 ';
    return enabled
      ? baseClasses + 'bg-green-500 text-green-800'
      : baseClasses + 'bg-red-500 text-red-800';
  }
} 