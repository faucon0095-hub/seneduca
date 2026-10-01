import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, LIBELLES_ROLE, ProfilUtilisateur } from '../../services/auth';

@Component({
  selector: 'app-dashboard-eleve',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-eleve.html',
  styleUrl: './dashboard-eleve.css'
})
export class DashboardEleve implements OnInit {

  profil = signal<ProfilUtilisateur | null>(null);
  libellesRole = LIBELLES_ROLE;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.profil.set(await this.authService.profilCourant());
  }

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

  async seDeconnecter() {
    await this.authService.deconnexion();
    this.router.navigate(['/login']);
  }

}