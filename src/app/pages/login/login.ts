import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  motDePasse = '';
  erreur = '';
  chargement = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async seConnecter() {
    this.erreur = '';
    this.chargement = true;
    try {
      const { user } = await this.authService.login(this.email, this.motDePasse);
      const role = await this.authService.getRole(user.uid);
      if (!role) {
        await this.authService.deconnexion();
        this.erreur = 'Profil introuvable. Contactez le support.';
        return;
      }
      this.router.navigate([this.authService.routeDashboard(role)]);
    } catch (error: any) {
      this.erreur = 'Email ou mot de passe incorrect.';
    } finally {
      this.chargement = false;
    }
  }

}