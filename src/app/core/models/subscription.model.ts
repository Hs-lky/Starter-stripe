export interface Subscription {
  id: number;
  userId: number;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  amount: number;
  currency: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  stripeSubscriptionId?: string;
  canceledAt?: string;
  cancelReason?: string;
}

export type SubscriptionPlan = 'FREE' | 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
export type SubscriptionStatus = 'PENDING' | 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'UNPAID' | 'TRIAL';

export interface SubscriptionFeature {
  name: string;
  description: string;
  included: boolean;
}

export interface PlanDetails {
  name: SubscriptionPlan;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
} 