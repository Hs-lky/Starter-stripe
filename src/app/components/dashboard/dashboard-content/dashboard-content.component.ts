import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

interface StatCard {
  value: string;
  label: string;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

interface Activity {
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  description: string;
  time: string;
}

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.sass'],
  standalone: true,
  imports: [CommonModule , DatePipe],
  providers: []
})
export class DashboardContentComponent implements OnInit {
  stats: StatCard[] = [
    { value: '2,451', label: 'Utilisateurs Totaux', icon: 'users', trend: { value: '+12%', isPositive: true } },
    { value: '12,5k€', label: 'Revenus', icon: 'euro', trend: { value: '+8.5%', isPositive: true } },
    { value: '85%', label: 'Croissance', icon: 'trending-up', trend: { value: '+5%', isPositive: true } },
    { value: '124', label: 'Nouveaux Clients', icon: 'user-plus', trend: { value: '+25%', isPositive: true } }
  ];

  recentActivities: Activity[] = [
    {
      type: 'success',
      title: 'Nouvel utilisateur inscrit',
      description: 'Jean Dupont a rejoint la plateforme',
      time: 'Il y a 2h'
    },
    {
      type: 'warning',
      title: 'Mise à jour système',
      description: 'Correctifs de sécurité installés',
      time: 'Il y a 5h'
    },
    {
      type: 'info',
      title: 'Nouvelle fonctionnalité',
      description: 'Module de statistiques avancées activé',
      time: 'Il y a 8h'
    }
  ];

  performanceMetrics = [
    { label: 'Pages Vues', value: '12,5k', trend: '+15%' },
    { label: 'Taux de Conversion', value: '3,2%', trend: '+2,1%' },
    { label: 'Temps Moyen', value: '2,5m', trend: '-1,2%' }
  ];

  currentDate = new Date();

  ngOnInit() {
    // Initialization logic if needed
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'success': return 'check-circle';
      case 'warning': return 'alert-triangle';
      case 'info': return 'info';
      case 'error': return 'x-circle';
      default: return 'circle';
    }
  }
} 