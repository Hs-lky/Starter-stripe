import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from '../services/subscription.service';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard {
  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  canActivate() {
    return this.subscriptionService.getCurrentUserSubscription().pipe(
      map(subscription => {
        if (!subscription) {
          this.router.navigate(['/dashboard/plans']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/dashboard/plans']);
        return of(false);
      })
    );
  }
} 