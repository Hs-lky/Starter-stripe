import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { Company } from '../../../models/company';

@Component({
  selector: 'section-hero',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.sass',
})
export class HeroComponent {
  features: string[] = [
    'Intégration Facile',
    'Design Moderne',
    'Plateforme Sécurisée'
  ];

  companies: Company[] = [
    {
      name: 'Nike',
      src: '/assets/logos/nike.svg',
    },
    {
      name: 'Stripe',
      src: '/assets/logos/stripe.svg',
    },
    {
      name: 'Disney',
      src: '/assets/logos/disney.svg',
    },
    {
      name: 'Coca-Cola',
      src: '/assets/logos/coca-cola.svg',
    },
    {
      name: 'Nasa',
      src: '/assets/logos/nasa.svg',
    },
  ];

  getImageWidth(name: string): number {
    switch (name) {
      case 'Nike': return 88;
      case 'Stripe': return 106;
      case 'Disney': return 107;
      case 'Coca-Cola': return 147;
      case 'Nasa': return 103;
      default: return 120;
    }
  }

  getImageHeight(name: string): number {
    switch (name) {
      case 'Nike': return 31;
      case 'Stripe': return 44;
      case 'Disney': return 44;
      case 'Coca-Cola': return 48;
      case 'Nasa': return 29;
      default: return 55;
    }
  }
}
