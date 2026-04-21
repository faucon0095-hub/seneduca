import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Login } from './pages/login/login';
import { Inscription } from './pages/inscription/inscription';
import { DashboardEleve } from './pages/dashboard-eleve/dashboard-eleve';
import { DashboardRepetiteur } from './pages/dashboard-repetiteur/dashboard-repetiteur';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'login', component: Login },
  { path: 'inscription', component: Inscription },
  { path: 'dashboard-eleve', component: DashboardEleve },
  { path: 'dashboard-repetiteur', component: DashboardRepetiteur },
  { path: 'dashboard-admin', component: DashboardAdmin },
  { path: '**', redirectTo: '' }
];