import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin {

  stats = [
    { icon: '👨‍🎓', label: 'Élèves actifs', valeur: '0', couleur: '#0D1B6E' },
    { icon: '👨‍🏫', label: 'Répétiteurs', valeur: '100', couleur: '#1B3FA0' },
    { icon: '💰', label: 'Revenus du mois', valeur: '0 FCFA', couleur: '#C8A84B' },
    { icon: '📅', label: 'Séances ce mois', valeur: '0', couleur: '#4AADE8' }
  ];

  demandes = [
    { nom: 'En attente', niveau: '-', matiere: '-', ville: '-', statut: 'nouveau' }
  ];

  seDeconnecter() {
    window.location.href = '/login';
  }

}