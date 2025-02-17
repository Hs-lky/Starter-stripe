import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

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
      <!-- Sidebar -->
      <aside class="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30">
        <!-- Logo -->
        <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <img src="assets/logo.svg" alt="Logo" class="h-8 w-auto">
          <button class="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                  (click)="toggleSidebar()">
            <i class="fas fa-times"></i>
          </button>
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

      <!-- Main Content -->
      <div class="lg:pl-64">
        <!-- Header -->
        <header class="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 lg:left-64 z-20">
          <div class="h-full px-4 flex items-center justify-between">
            <!-- Mobile Menu Button -->
            <button class="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    (click)="toggleSidebar()">
              <i class="fas fa-bars"></i>
            </button>

            <!-- Search -->
            <div class="hidden sm:flex items-center flex-1 px-4 max-w-xl">
              <div class="relative w-full">
                <input type="text" 
                       placeholder="Search..."
                       class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg
                              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

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
                  <!-- <span class="hidden sm:block text-sm font-medium text-gray-700">John Doe</span> -->
                  <i class="fas fa-chevron-down text-xs text-gray-400"></i>
                </button>

                <!-- Profile Menu -->
                @if (isProfileMenuOpen) {
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100
                              animate-fade-in">
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
                      <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
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
  isSidebarOpen = false;

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Tableau de Bord',
      route: '/dashboard'
    },
    {
      icon: 'fas fa-users',
      label: 'Gestion des Utilisateurs',
      route: '/dashboard/users',
      badge: 'Nouveau'
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

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
} 