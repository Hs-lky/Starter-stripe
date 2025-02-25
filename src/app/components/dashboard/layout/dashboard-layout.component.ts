import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Sidebar - can be completely hidden -->
      <aside class="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30 transition-all duration-300 ease-in-out"
             [class.translate-x-0]="isSidebarOpen"
             [class.-translate-x-full]="!isSidebarOpen">
        <!-- Logo -->
        <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <img src="assets/logo.svg" alt="Logo" class="h-8 w-auto">
        </div>

        <!-- Navigation -->
        <nav class="p-4 space-y-1">
          @for (item of menuItems; track item) {
            <a [routerLink]="item.route"
               routerLinkActive="bg-primary-50 text-primary-600"
               class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg
                      hover:bg-gray-50 transition-colors duration-200">
              <i [class]="item.icon"></i>
              <span>{{item.label}}</span>
              @if (item.badge) {
                <span class="ml-auto text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full">
                  {{item.badge}}
                </span>
              }
            </a>
          }
        </nav>
      </aside>

      <!-- Main Content - adjusts width based on sidebar state -->
      <div class="transition-all duration-300 ease-in-out"
           [class.pl-64]="isSidebarOpen"
           [class.pl-0]="!isSidebarOpen">
        <!-- Header -->
        <header class="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-20 transition-all duration-300"
                [class.left-64]="isSidebarOpen"
                [class.left-0]="!isSidebarOpen">
          <div class="h-full px-4 flex items-center justify-between">
            <!-- Toggle Button -->
            <button class="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    (click)="toggleSidebar()">
              <i class="fas fa-bars text-gray-600"></i>
            </button>

            <!-- Right Actions -->
            <div class="flex items-center gap-4">
              <!-- Notifications -->
              <button class="p-2 rounded-lg hover:bg-gray-100 relative">
                <i class="fas fa-bell text-gray-600"></i>
                <span class="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
              </button>

              <!-- Profile -->
              <div class="relative">
                <button class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                        (click)="toggleProfileMenu()">
                  <img src="assets/avatar.jpg" 
                       alt="Profile" 
                       class="w-8 h-8 rounded-full">
                  <i class="fas fa-chevron-down text-xs text-gray-400"></i>
                </button>

                <!-- Profile Menu -->
                @if (isProfileMenuOpen) {
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div class="py-2">
                      <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <i class="fas fa-user"></i>
                        Profile
                      </a>
                      <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <i class="fas fa-cog"></i>
                        Paramétres
                      </a>
                      <hr class="my-1 border-gray-100">
                      <a class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                         (click)="onLogout()">
                        <i class="fas fa-sign-out-alt"></i>
                        Déconnexion
                      </a>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="pt-16 min-h-screen">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class DashboardLayoutComponent {
  isProfileMenuOpen = false;
  isSidebarOpen = true; // Default to open

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Tableau de Bord',
      route: '/dashboard/dsh-cnt',
      badge: 'Nouveau'
    },
    {
      icon: 'fas fa-users',
      label: 'Gestion des Utilisateurs',
      route: '/dashboard/users'
    },
    {
      icon: 'fas fa-credit-card',
      label: 'Abonnements',
      route: '/dashboard/subscriptions'
    },
    {
      icon: 'fas fa-chart-bar',
      label: 'Analytique',
      route: '/dashboard/analytics'
    },
    {
      icon: 'fas fa-cog',
      label: 'Paramètres',
      route: '/dashboard/settings'
    }
  ];

  constructor(private userService: UserService) {}

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogout(): void {
    this.isProfileMenuOpen = false;
    this.userService.logout();
  }
} 