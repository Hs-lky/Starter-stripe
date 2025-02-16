import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard/layout/dashboard-layout.component';
import { UserManagementComponent } from './components/dashboard/users/user-management.component';
import { SubscriptionManagementComponent } from './components/dashboard/subscriptions/subscription-management.component';

// Routes
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
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
  {
    path: '**',
    redirectTo: ''
  }
];
