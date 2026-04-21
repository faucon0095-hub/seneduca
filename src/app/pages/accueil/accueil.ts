import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {

  envoyerWhatsApp() {
    const message = 'Bonjour SénEduca, je souhaite trouver un répétiteur pour mon enfant.';
    window.open('https://wa.me/221709380086?text=' + encodeURIComponent(message), '_blank');
  }

}