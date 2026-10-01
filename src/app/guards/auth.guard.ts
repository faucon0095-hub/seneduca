import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, Role } from '../services/auth';

// Bloque l'accès aux utilisateurs non connectés.
export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await authService.utilisateurCourant();
  return user ? true : router.createUrlTree(['/login']);
};

// Bloque l'accès aux utilisateurs dont le rôle n'est pas dans `roles`
// et les renvoie vers le dashboard correspondant à leur rôle.
export const roleGuard = (roles: Role[]): CanActivateFn => async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await authService.utilisateurCourant();
  if (!user) {
    return router.createUrlTree(['/login']);
  }

  const role = await authService.getRole(user.uid);
  if (role && roles.includes(role)) {
    return true;
  }

  const cible = authService.routeDashboard(role);
  if (cible === '/login') {
    // Compte sans profil Firestore : on déconnecte pour éviter une boucle.
    await authService.deconnexion();
  }
  return router.createUrlTree([cible]);
};
