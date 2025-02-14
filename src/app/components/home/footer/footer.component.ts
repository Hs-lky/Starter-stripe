import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface FooterLink {
  name: string;
  url: string;
  icon?: string;
}

interface SocialLink extends FooterLink {
  followers: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  newsletterSuccess = false;
  isLanguageMenuOpen = false;
  currentLanguage = 'English';
  
  languages = [
    'English',
    'French',
    'Spanish',
    'German',
    'Chinese'
  ];

  socialLinks: SocialLink[] = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourcompany',
      icon: 'fab fa-twitter',
      followers: '50K followers'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/yourcompany',
      icon: 'fab fa-linkedin',
      followers: '100K followers'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/yourcompany',
      icon: 'fab fa-github',
      followers: '20K followers'
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/yourcompany',
      icon: 'fab fa-discord',
      followers: '30K members'
    }
  ];

  productLinks: FooterLink[] = [
    {
      name: 'Features',
      url: '/features',
      icon: 'fas fa-star'
    },
    {
      name: 'Pricing',
      url: '/pricing',
      icon: 'fas fa-tag'
    },
    {
      name: 'Integrations',
      url: '/integrations',
      icon: 'fas fa-puzzle-piece'
    },
    {
      name: 'Enterprise',
      url: '/enterprise',
      icon: 'fas fa-building'
    },
    {
      name: 'Security',
      url: '/security',
      icon: 'fas fa-shield-alt'
    }
  ];

  companyLinks: FooterLink[] = [
    {
      name: 'About Us',
      url: '/about',
      icon: 'fas fa-info-circle'
    },
    {
      name: 'Careers',
      url: '/careers',
      icon: 'fas fa-briefcase'
    },
    {
      name: 'Blog',
      url: '/blog',
      icon: 'fas fa-rss'
    },
    {
      name: 'Press',
      url: '/press',
      icon: 'fas fa-newspaper'
    },
    {
      name: 'Contact',
      url: '/contact',
      icon: 'fas fa-envelope'
    }
  ];

  resourceLinks: FooterLink[] = [
    {
      name: 'Documentation',
      url: '/docs',
      icon: 'fas fa-book'
    },
    {
      name: 'Help Center',
      url: '/help',
      icon: 'fas fa-question-circle'
    },
    {
      name: 'API Reference',
      url: '/api',
      icon: 'fas fa-code'
    },
    {
      name: 'Community',
      url: '/community',
      icon: 'fas fa-users'
    },
    {
      name: 'Status',
      url: '/status',
      icon: 'fas fa-signal'
    }
  ];

  legalLinks: FooterLink[] = [
    {
      name: 'Terms of Service',
      url: '/terms'
    },
    {
      name: 'Privacy Policy',
      url: '/privacy'
    },
    {
      name: 'Cookie Policy',
      url: '/cookies'
    },
    {
      name: 'License',
      url: '/license'
    }
  ];

  ngOnInit() {
    // Initialize any necessary data
  }

  async subscribeNewsletter() {
    if (!this.newsletterEmail) return;

    try {
      // Here you would typically make an API call to subscribe the user
      // For now, we'll just simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.newsletterSuccess = true;
      this.newsletterEmail = '';

      // Reset success message after 3 seconds
      setTimeout(() => {
        this.newsletterSuccess = false;
      }, 3000);
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  }

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  selectLanguage(lang: string) {
    this.currentLanguage = lang;
    this.isLanguageMenuOpen = false;
    // Here you would typically implement language change logic
  }
}
