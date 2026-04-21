import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-repetiteur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-repetiteur.html',
  styleUrl: './dashboard-repetiteur.css'
})
export class DashboardRepetiteur {

  repetiteur = { email: 'repetiteur@seneduca.com', nom: 'Professeur Diallo' };

  stats = [
    { icon: '👨‍🎓', label: 'Élèves actifs', valeur: '0' },
    { icon: '📚', label: 'Séances ce mois', valeur: '0' },
    { icon: '💰', label: 'Revenus du mois', valeur: '0 FCFA' },
    { icon: '⭐', label: 'Note moyenne', valeur: '-' }
  ];

  eleves = [
    { nom: 'En attente', niveau: '-', matiere: '-', statut: 'inactif' }
  ];

  seDeconnecter() {
    window.location.href = '/login';
  }

}