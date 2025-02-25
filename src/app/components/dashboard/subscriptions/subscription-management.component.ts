import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { UserService } from '../../../core/services/user.service';
import { Subscription, PlanDetails, SubscriptionPlan } from '../../../core/models/subscription.model';
import { User } from '../../../core/models/user.model';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { Subject, of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription-management.component.html'
})
export class SubscriptionManagementComponent implements OnInit, OnDestroy {
  @ViewChild('dropdownTrigger') dropdownTrigger!: ElementRef;
  
  private platformId = inject(PLATFORM_ID);
  currentUser: User | null = null;
  currentSubscription: Subscription | null = null;
  subscriptionHistory: Subscription[] = [];
  errorMessage = '';
  isLoading = false;
  private destroy$ = new Subject<void>();

  availablePlans: PlanDetails[] = [
    {
      name: 'BASIC',
      price: 29,
      description: 'Fonctionnalités essentielles pour les petites équipes',
      features: [],
      recommended: false
    },
    {
      name: 'PREMIUM',
      price: 99,
      description: 'Fonctionnalités avancées pour les entreprises en croissance',
      features: [],
      recommended: true
    },
    {
      name: 'ENTERPRISE',
      price: 299,
      description: 'Suite complète de fonctionnalités pour les grandes organisations',
      features: [],
      recommended: false
    }
  ];

  constructor(
    private subscriptionService: SubscriptionService,
    private userService: UserService
  ) {
    // Initialize plan features after service injection
    this.availablePlans = this.availablePlans.map(plan => ({
      ...plan,
      features: this.subscriptionService.getSubscriptionFeatures(plan.name)
    }));
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadData();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  loadData() {
    const token = this.getToken();
    if (!token) {
      this.errorMessage = 'Veuillez vous connecter pour voir les informations d\'abonnement.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getCurrentUser()
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Error loading user profile:', error);
          this.errorMessage = 'Impossible de charger les informations utilisateur. Veuillez réessayer plus tard.';
          return of(null);
        }),
        finalize(() => {
          if (!this.currentUser) {
            this.isLoading = false;
          }
        })
      )
      .subscribe(user => {
        if (user) {
          this.currentUser = user;
          this.loadSubscriptionData();
        }
      });
  }

  loadSubscriptionData() {
    if (!this.currentUser) {
      this.isLoading = false;
      return;
    }

    const activeSubscription$ = this.subscriptionService.getUserActiveSubscription(this.currentUser.id)
      .pipe(
        catchError(error => {
          console.error('Error loading active subscription:', error);
          return of(null);
        })
      );

    const subscriptionHistory$ = this.subscriptionService.getUserSubscriptions()
      .pipe(
        catchError(error => {
          console.error('Error loading subscription history:', error);
          return of([]);
        })
      );

    forkJoin({
      active: activeSubscription$,
      history: subscriptionHistory$
    })
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: ({ active, history }) => {
        this.currentSubscription = active;
        this.subscriptionHistory = history.sort((a, b) => 
          new Date(b.currentPeriodStart).getTime() - new Date(a.currentPeriodStart).getTime()
        );
      },
      error: (error) => {
        console.error('Error loading subscription data:', error);
        this.errorMessage = 'Erreur lors du chargement des informations d\'abonnement. Veuillez réessayer plus tard.';
      }
    });
  }

  startSubscription(plan: string) {
    if (!this.currentUser) {
      this.errorMessage = 'Veuillez vous connecter pour vous abonner à un plan.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.subscriptionService.createCheckoutSession(plan)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => {
          console.error('Error creating checkout session:', error);
          this.errorMessage = 'Unable to process subscription request. Please try again later.';
          return of(null);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(response => {
        if (response?.sessionUrl) {
          window.location.href = response.sessionUrl;
        }
      });
  }

  updatePaymentDetails() {
    this.subscriptionService.updatePaymentDetails()
      .subscribe({
        next: (response) => {
          // Redirect to Stripe's Customer Portal
          window.location.href = response.portalUrl;
        },
        error: (error) => {
          console.error('Error creating portal session:', error);
          // Handle error appropriately
        }
      });
  }
  getSubscriptionBadgeClass(status: string): string {
    const baseClasses = 'bg-opacity-10 ';
    switch (status) {
      case 'ACTIVE':
        return baseClasses + 'bg-green-500 text-green-800';
      case 'TRIAL':
        return baseClasses + 'bg-blue-500 text-blue-800';
      case 'PAST_DUE':
        return baseClasses + 'bg-yellow-500 text-yellow-800';
      case 'UNPAID':
        return baseClasses + 'bg-red-500 text-red-800';
      case 'CANCELED':
        return baseClasses + 'bg-gray-500 text-gray-800';
      default:
        return baseClasses + 'bg-gray-500 text-gray-800';
    }
  }

  getSubscriptionDescription(plan: string): string {
    return this.subscriptionService.getSubscriptionDescription(plan);
  }

  getSubscriptionFeatures(plan: string): string[] {
    return this.subscriptionService.getSubscriptionFeatures(plan);
  }

  getSubscriptionPrice(plan: string): number {
    return this.subscriptionService.getSubscriptionPrice(plan);
  }

  getAvailablePlans(): PlanDetails[] {
    if (!this.currentSubscription) {
      return this.availablePlans;
    }

    return this.availablePlans.map(plan => ({
      ...plan,
      recommended: plan.name !== this.currentSubscription?.plan && 
                  this.getSubscriptionPrice(plan.name) > this.getSubscriptionPrice(this.currentSubscription?.plan || '')
    }));
  }

  onUpgradeClick() {
    // Redirect to plans section or show upgrade modal
    this.isLoading = true;
    // You can implement the upgrade logic here
    this.isLoading = false;
  }
} 