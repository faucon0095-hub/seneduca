import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, LIBELLES_ROLE, ProfilUtilisateur } from '../../services/auth';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin implements OnInit {

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
    { icon: '👨‍🎓', label: 'Élèves actifs', valeur: '0', couleur: '#0D1B6E' },
    { icon: '👨‍🏫', label: 'Répétiteurs', valeur: '100', couleur: '#1B3FA0' },
    { icon: '💰', label: 'Revenus du mois', valeur: '0 FCFA', couleur: '#C8A84B' },
    { icon: '📅', label: 'Séances ce mois', valeur: '0', couleur: '#4AADE8' }
  ];

  demandes = [
    { nom: 'En attente', niveau: '-', matiere: '-', ville: '-', statut: 'nouveau' }
  ];

  async seDeconnecter() {
    await this.authService.deconnexion();
    this.router.navigate(['/login']);
  }

}