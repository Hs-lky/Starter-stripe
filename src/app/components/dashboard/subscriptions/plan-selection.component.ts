import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { PlanDetails } from '../../../core/models/subscription.model';

@Component({
  selector: 'app-plan-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50/50 p-4 lg:p-8">
      <!-- Header with Gradient Background -->
      <div class="relative mb-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 overflow-hidden">
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div class="relative">
          <h1 class="text-2xl lg:text-3xl font-bold text-white mb-2">Choose Your Plan</h1>
          <p class="text-primary-100">Select the plan that best fits your needs</p>
        </div>
      </div>

      <!-- Plans Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div *ngFor="let plan of availablePlans" 
             class="relative bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-primary-500 hover:shadow-lg"
             [class.ring-2]="plan.recommended"
             [class.ring-primary-500]="plan.recommended">
          <div *ngIf="plan.recommended" class="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-xl text-sm font-medium">
            Recommended
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900">{{plan.name}}</h3>
            <p class="text-gray-500 mt-2">{{getSubscriptionDescription(plan.name)}}</p>
            
            <div class="mt-4 flex items-baseline">
              <span class="text-3xl font-bold text-gray-900">\${{getSubscriptionPrice(plan.name)}}</span>
              <span class="ml-2 text-gray-500">/month</span>
            </div>

            <ul class="mt-6 space-y-3">
              <li *ngFor="let feature of getSubscriptionFeatures(plan.name)" class="flex items-start">
                <div class="flex-shrink-0 h-5 w-5 text-primary-500">
                  <i class="fas fa-check-circle"></i>
                </div>
                <p class="ml-3 text-sm text-gray-700">{{feature}}</p>
              </li>
            </ul>

            <button (click)="startSubscription(plan.name)"
                    class="mt-6 w-full inline-flex items-center justify-center px-5 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    [class.bg-primary-600]="plan.recommended"
                    [class.text-white]="plan.recommended"
                    [class.hover:bg-primary-700]="plan.recommended"
                    [class.focus:ring-primary-500]="plan.recommended"
                    [class.border]="!plan.recommended"
                    [class.border-gray-300]="!plan.recommended"
                    [class.text-gray-700]="!plan.recommended"
                    [class.hover:bg-gray-50]="!plan.recommended"
                    [class.focus:ring-gray-500]="!plan.recommended">
              <i class="fas fa-arrow-right mr-2"></i>
              Choose {{plan.name}}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div *ngIf="isLoading" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-6 flex flex-col items-center max-w-sm mx-4">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
          <p class="text-gray-900 font-medium">Processing your request...</p>
          <p class="text-gray-500 text-sm text-center mt-2">You'll be redirected to the secure payment page shortly.</p>
        </div>
      </div>
    </div>
  `
})
export class PlanSelectionComponent {
  isLoading = false;

  availablePlans: PlanDetails[] = [
    {
      name: 'BASIC',
      price: 29,
      description: 'Essential features for small teams',
      features: this.subscriptionService.getSubscriptionFeatures('BASIC'),
      recommended: false
    },
    {
      name: 'PREMIUM',
      price: 99,
      description: 'Advanced features for growing businesses',
      features: this.subscriptionService.getSubscriptionFeatures('PREMIUM'),
      recommended: true
    },
    {
      name: 'ENTERPRISE',
      price: 299,
      description: 'Full suite of features for large organizations',
      features: this.subscriptionService.getSubscriptionFeatures('ENTERPRISE'),
      recommended: false
    }
  ];

  constructor(private subscriptionService: SubscriptionService) {}

  getSubscriptionDescription(plan: string): string {
    return this.subscriptionService.getSubscriptionDescription(plan);
  }

  getSubscriptionFeatures(plan: string): string[] {
    return this.subscriptionService.getSubscriptionFeatures(plan);
  }

  getSubscriptionPrice(plan: string): number {
    return this.subscriptionService.getSubscriptionPrice(plan);
  }

  startSubscription(plan: string) {
    this.isLoading = true;
    this.subscriptionService.createCheckoutSession(plan).subscribe({
      next: (response) => {
        window.location.href = response.sessionUrl;
      },
      error: (error) => {
        console.error('Error creating checkout session:', error);
        this.isLoading = false;
      }
    });
  }
} 