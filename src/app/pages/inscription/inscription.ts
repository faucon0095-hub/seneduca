import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, Role } from '../../services/auth';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class Inscription {

  nom = '';
  email = '';
  telephone = '';
  motDePasse = '';
  role: Role = 'parent';
  erreur = '';
  chargement = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async sInscrire() {
    this.erreur = '';
    this.chargement = true;
    try {
      await this.authService.inscription(this.email, this.motDePasse, this.nom, this.telephone, this.role);
      this.router.navigate([this.authService.routeDashboard(this.role)]);
    } catch (error: any) {
      this.erreur = 'Erreur lors de l\'inscription. Vérifiez vos informations.';
    } finally {
      this.chargement = false;
    }
  }

}