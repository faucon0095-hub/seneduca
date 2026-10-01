import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, LIBELLES_ROLE, ProfilUtilisateur } from '../../services/auth';

@Component({
  selector: 'app-dashboard-repetiteur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-repetiteur.html',
  styleUrl: './dashboard-repetiteur.css'
})
export class DashboardRepetiteur implements OnInit {

  profil = signal<ProfilUtilisateur | null>(null);
  libellesRole = LIBELLES_ROLE;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.profil.set(await this.authService.profilCourant());
  }


  stats = [
    { icon: '👨‍🎓', label: 'Élèves actifs', valeur: '0' },
    { icon: '📚', label: 'Séances ce mois', valeur: '0' },
    { icon: '💰', label: 'Revenus du mois', valeur: '0 FCFA' },
    { icon: '⭐', label: 'Note moyenne', valeur: '-' }
  ];

  eleves = [
    { nom: 'En attente', niveau: '-', matiere: '-', statut: 'inactif' }
  ];

  async seDeconnecter() {
    await this.authService.deconnexion();
    this.router.navigate(['/login']);
  }

}