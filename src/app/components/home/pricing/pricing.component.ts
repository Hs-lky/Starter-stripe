import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQLink {
  text: string;
  url: string;
  icon: string;
}

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
  additionalInfo?: string;
  links?: FAQLink[];
}

@Component({
  selector: 'section-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  isAnnual = false;

  toggleBilling() {
    this.isAnnual = !this.isAnnual;
  }

  faqs: FAQ[] = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
      isOpen: false,
      additionalInfo: 'All payments are processed securely through Stripe.',
      links: [
        {
          text: 'View Payment Methods',
          url: '#payment-methods',
          icon: 'fas fa-credit-card'
        },
        {
          text: 'Security Info',
          url: '#security',
          icon: 'fas fa-shield-alt'
        }
      ]
    },
    {
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
      isOpen: false,
      additionalInfo: 'Pro-rated charges will be automatically calculated for plan changes.',
      links: [
        {
          text: 'How to Change Plans',
          url: '#change-plan',
          icon: 'fas fa-exchange-alt'
        }
      ]
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 14-day free trial on our Pro plan. No credit card required.',
      isOpen: false,
      additionalInfo: 'You can upgrade to a paid plan at any time during your trial.',
      links: [
        {
          text: 'Start Free Trial',
          url: '#trial',
          icon: 'fas fa-rocket'
        }
      ]
    },
    {
      question: 'What happens when I upgrade or downgrade?',
      answer: 'When you upgrade, you\'ll immediately get access to new features. When downgrading, you\'ll retain access until your current billing period ends.',
      isOpen: false,
      links: [
        {
          text: 'View Plan Comparison',
          url: '#compare',
          icon: 'fas fa-table'
        }
      ]
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans.',
      isOpen: false,
      additionalInfo: 'Refund requests are typically processed within 3-5 business days.',
      links: [
        {
          text: 'Refund Policy',
          url: '#refunds',
          icon: 'fas fa-undo'
        }
      ]
    },
  ];
}
