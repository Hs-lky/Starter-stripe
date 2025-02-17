import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-cancel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50/50 p-4 lg:p-8">
      <!-- Header with Gradient Background -->
      <div class="relative mb-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 overflow-hidden">
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div class="relative">
          <h1 class="text-2xl lg:text-3xl font-bold text-white mb-2">Abonnement Annulé</h1>
          <p class="text-primary-100">Votre processus d'abonnement a été annulé.</p>
        </div>
      </div>

      <!-- Cancel Content -->
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div class="p-8 text-center">
            <div class="mb-6">
              <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <i class="fas fa-times text-2xl text-gray-500"></i>
              </div>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Processus d'Abonnement Annulé</h2>
            <p class="text-gray-600 mb-8">
              Le processus d'abonnement a été annulé. Aucun frais n'a été prélevé sur votre compte.
              Vous pouvez réessayer quand vous le souhaitez.
            </p>

            <div class="space-y-4">
              <button (click)="tryAgain()" 
                      class="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200">
                <i class="fas fa-redo mr-2"></i>
                Réessayer
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
export class SubscriptionCancelComponent {
  constructor(private router: Router) {}

  tryAgain() {
    this.router.navigate(['/dashboard/subscription']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
} 