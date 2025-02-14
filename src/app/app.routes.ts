import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard/layout/dashboard-layout.component';
import { UserManagementComponent } from './components/dashboard/users/user-management.component';
import { SubscriptionManagementComponent } from './components/dashboard/subscriptions/subscription-management.component';

// Routes
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        component: UserManagementComponent
      },
      {
        path: 'subscriptions',
        component: SubscriptionManagementComponent
      }
    ]
  },
];
