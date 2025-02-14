import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'cancelled' | 'past_due';
  startDate: string;
  nextBilling: string;
  amount: number;
  interval: 'monthly' | 'yearly';
}

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription-management.component.html'
})
export class SubscriptionManagementComponent {
  subscriptions: Subscription[] = [
    {
      id: '1',
      plan: 'Pro Plan',
      status: 'active',
      startDate: 'Feb 1, 2024',
      nextBilling: 'Mar 1, 2024',
      amount: 49.00,
      interval: 'monthly'
    },
    {
      id: '2',
      plan: 'Pro Plan',
      status: 'active',
      startDate: 'Jan 1, 2024',
      nextBilling: 'Feb 1, 2024',
      amount: 49.00,
      interval: 'monthly'
    },
    {
      id: '3',
      plan: 'Basic Plan',
      status: 'cancelled',
      startDate: 'Dec 1, 2023',
      nextBilling: 'Jan 1, 2024',
      amount: 29.00,
      interval: 'monthly'
    }
  ];

  getStatusBadgeClass(status: string): string {
    const baseClasses = 'bg-opacity-10 ';
    switch (status) {
      case 'active':
        return baseClasses + 'bg-green-500 text-green-800';
      case 'cancelled':
        return baseClasses + 'bg-red-500 text-red-800';
      case 'past_due':
        return baseClasses + 'bg-yellow-500 text-yellow-800';
      default:
        return baseClasses + 'bg-gray-500 text-gray-800';
    }
  }
} 