import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionService } from '../../../core/services/subscription.service';

@Component({
  selector: 'app-subscription-success',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50/50 p-4 lg:p-8">
      <!-- Header with Gradient Background -->
      <div class="relative mb-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 overflow-hidden">
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div class="relative">
          <h1 class="text-2xl lg:text-3xl font-bold text-white mb-2">Abonnement Activé !</h1>
          <p class="text-primary-100">Votre abonnement a été activé avec succès.</p>
        </div>
      </div>

      <!-- Success Content -->
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div class="p-8 text-center">
            <div class="mb-6">
              <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <i class="fas fa-check text-2xl text-green-500"></i>
              </div>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Merci pour Votre Abonnement !</h2>
            <p class="text-gray-600 mb-8">
              Votre paiement a été traité avec succès et votre abonnement est maintenant actif.
              Vous pouvez commencer à utiliser toutes les fonctionnalités de votre plan immédiatement.
            </p>

            <div class="space-y-4">
              <button (click)="goToSubscriptions()" 
                      class="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200">
                <i class="fas fa-arrow-right mr-2"></i>
                Voir Mon Abonnement
              </button>
              
              <div>
                <button (click)="goToDashboard()" 
                        class="inline-flex items-center justify-center px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200">
                  <i class="fas fa-home mr-2"></i>
                  Aller au Tableau de Bord
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SubscriptionSuccessComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    // Get the session_id from URL params
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (sessionId) {
      // You can add logic here to verify the session with your backend if needed
      console.log('Stripe session ID:', sessionId);
    }
  }

  goToSubscriptions() {
    this.router.navigate(['/dashboard/subscription']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
} 