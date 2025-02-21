import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Components
import { NavbarComponent } from '../../components/home/navbar/navbar.component';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { FeaturesComponent } from '../../components/home/features/features.component';
import { PricingComponent } from '../../components/home/pricing/pricing.component';
import { FooterComponent } from '../../components/home/footer/footer.component';

interface TrustCompany {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    PricingComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  constructor(private router: Router) {}

  trustCompanies: TrustCompany[] = [
    {
      name: 'Microsoft',
      logo: '../../../../assets/logos/microsoft.svg'
    },
    {
      name: 'Google',
      logo: '../../../../assets/logos/google.svg'
    },
    {
      name: 'Amazon',
      logo: '../../../../assets/logos/amazon.svg'
    },
    {
      name: 'Apple',
      logo: '../../../../assets/logos/apple.svg'
    }
  ];

  navigateToLogin() {
    this.router.navigate(['/auth/auth/login']);
  }
}
