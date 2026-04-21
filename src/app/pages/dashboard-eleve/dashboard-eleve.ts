import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-eleve',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-eleve.html',
  styleUrl: './dashboard-eleve.css'
})
export class DashboardEleve {

  utilisateur = { email: 'habib@seneduca.com' };
  chargement = false;

  stats = [
    { icon: '📚', label: 'Séances effectuées', valeur: '0' },
    { icon: '⏰', label: 'Heures de cours', valeur: '0h' },
    { icon: '📈', label: 'Progression', valeur: '0%' },
    { icon: '⭐', label: 'Note moyenne', valeur: '-' }
  ];

  prochainCours = {
    matiere: 'En attente',
    repetiteur: 'Non assigné',
    date: 'À définir',
    heure: '--:--',
    type: 'domicile'
  };

  seDeconnecter() {
    window.location.href = '/login';
  }

}