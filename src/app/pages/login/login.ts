import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { messageErreurAuth } from '../../services/auth-erreurs';

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
  erreur = signal('');
  message = signal('');
  chargement = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async seConnecter() {
    this.erreur.set('');
    this.message.set('');
    this.chargement.set(true);
    try {
      const { user } = await this.authService.login(this.email.trim(), this.motDePasse);
      const role = await this.authService.getRole(user.uid);
      if (!role) {
        await this.authService.deconnexion();
        this.erreur.set('Profil introuvable. Contactez le support.');
        return;
      }
      this.router.navigate([this.authService.routeDashboard(role)]);
    } catch (error: unknown) {
      this.erreur.set(messageErreurAuth(error));
    } finally {
      this.chargement.set(false);
    }
  }

  async motDePasseOublie() {
    this.erreur.set('');
    this.message.set('');
    const email = this.email.trim();
    if (!email) {
      this.erreur.set('Saisissez votre email ci-dessus, puis cliquez sur « Mot de passe oublié ? ».');
      return;
    }
    this.chargement.set(true);
    try {
      await this.authService.reinitialiserMotDePasse(email);
      this.message.set(`Si un compte existe pour ${email}, un email de réinitialisation vient d'être envoyé. Pensez à vérifier vos spams.`);
    } catch (error: unknown) {
      this.erreur.set(messageErreurAuth(error));
    } finally {
      this.chargement.set(false);
    }
  }

}
