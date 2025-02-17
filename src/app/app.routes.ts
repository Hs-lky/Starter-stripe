import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard/layout/dashboard-layout.component';
import { UserManagementComponent } from './components/dashboard/users/user-management.component';
import { SubscriptionGuard } from './core/guards/subscription.guard';
import { SubscriptionSuccessComponent } from './components/dashboard/subscriptions/subscription-success.component';
import { SubscriptionCancelComponent } from './components/dashboard/subscriptions/subscription-cancel.component';

// Routes
import { HomeComponent } from './pages/home/home.component';
import { SubscriptionManagementComponent } from './components/dashboard/subscriptions/subscription-management.component';

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
      },
      {
        path: 'subscription/success',
        component: SubscriptionSuccessComponent
      },
      {
        path: 'subscription/cancel',
        component: SubscriptionCancelComponent
      }
    ]
  },
  {
    path: 'dashboard/subscriptions',
    loadComponent: () => import('./components/dashboard/subscriptions/subscription-management.component')
      .then(m => m.SubscriptionManagementComponent),
    canActivate: [SubscriptionGuard]
  },
  {
    path: 'dashboard/plans',
    loadComponent: () => import('./components/dashboard/subscriptions/plan-selection.component')
      .then(m => m.PlanSelectionComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
