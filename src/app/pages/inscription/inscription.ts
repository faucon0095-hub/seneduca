import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, Role } from '../../services/auth';
import { messageErreurAuth } from '../../services/auth-erreurs';

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
  erreur = signal('');
  chargement = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async sInscrire() {
    this.erreur.set('');
    if (this.motDePasse.length < 6) {
      this.erreur.set('Le mot de passe est trop court (6 caractères minimum).');
      return;
    }
    this.chargement.set(true);
    try {
      await this.authService.inscription(this.email.trim(), this.motDePasse, this.nom, this.telephone, this.role);
      this.router.navigate([this.authService.routeDashboard(this.role)]);
    } catch (error: unknown) {
      this.erreur.set(messageErreurAuth(error));
    } finally {
      this.chargement.set(false);
    }
  }

}