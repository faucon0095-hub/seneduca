import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

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
  role = 'parent';
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
await this.authService.inscription(this.email, this.motDePasse);      this.router.navigate(['/dashboard-eleve']);
    } catch (error: any) {
      this.erreur = 'Erreur lors de l\'inscription. Vérifiez vos informations.';
    } finally {
      this.chargement = false;
    }
  }

}