import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Subscription } from '../models/subscription.model';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = `${environment.apiUrl}/subscriptions`;

  constructor(private http: HttpClient) {}

  getUserSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiUrl);
  }

  getUserSubscriptionsByUserId(userId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.apiUrl}/user/${userId}`);
  }

  getUserActiveSubscription(userId: number): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/active/user/${userId}`);
  }

  createCheckoutSession(plan: string): Observable<{ sessionId: string; sessionUrl: string }> {
    return this.http.post<{ sessionId: string; sessionUrl: string }>(
      `${this.apiUrl}/create-checkout-session`,
      { plan }
    );
  }

  getCurrentUserSubscription(): Observable<Subscription | null> {
    return this.http.get<Subscription>(`${this.apiUrl}/current`).pipe(
      catchError(() => of(null))
    );
  }

  getSubscriptionDescription(plan: string): string {
    const descriptions: { [key: string]: string } = {
      'FREE': 'Basic access with limited features',
      'BASIC': 'Essential features for small teams',
      'PREMIUM': 'Advanced features for growing businesses',
      'ENTERPRISE': 'Full suite of features for large organizations'
    };
    return descriptions[plan] || 'Unknown plan';
  }

  getSubscriptionFeatures(plan: string): string[] {
    const features: { [key: string]: string[] } = {
      'FREE': [
        'Up to 2 team members',
        'Basic project management',
        'Limited storage (500MB)',
        'Community support'
      ],
      'BASIC': [
        'Up to 5 team members',
        'Advanced project management',
        '5GB storage',
        'Email support',
        'API access'
      ],
      'PREMIUM': [
        'Up to 20 team members',
        'Premium features',
        '50GB storage',
        'Priority support',
        'Advanced analytics',
        'Custom integrations'
      ],
      'ENTERPRISE': [
        'Unlimited team members',
        'All premium features',
        'Unlimited storage',
        'Dedicated support',
        'Custom development',
        'SLA guarantee',
        'On-premise deployment option'
      ]
    };
    return features[plan] || [];
  }

  getSubscriptionPrice(plan: string): number {
    const prices: { [key: string]: number } = {
      'FREE': 0,
      'BASIC': 29,
      'PREMIUM': 99,
      'ENTERPRISE': 299
    };
    return prices[plan] || 0;
  }

  activateSubscription(sessionId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/activate`, null, {
      params: { sessionId }
    });
  }
} 