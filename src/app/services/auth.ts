import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword,
         sendPasswordResetEmail, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

export type Role = 'parent' | 'eleve' | 'repetiteur' | 'admin';

// Rôles qu'un utilisateur peut choisir lui-même à l'inscription.
// 'admin' n'en fait jamais partie : il est attribué manuellement dans Firestore.
export const ROLES_INSCRIPTION: Role[] = ['parent', 'eleve', 'repetiteur'];

export const LIBELLES_ROLE: Record<Role, string> = {
  parent: 'Parent',
  eleve: 'Élève',
  repetiteur: 'Répétiteur',
  admin: 'Administrateur'
};

export interface ProfilUtilisateur {
  nom: string;
  email: string;
  telephone: string;
  role: Role;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async inscription(email: string, password: string, nom: string, telephone: string, role: Role) {
    if (!ROLES_INSCRIPTION.includes(role)) {
      throw new Error('Rôle non autorisé à l\'inscription.');
    }
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const profil: ProfilUtilisateur = { nom, email, telephone, role };
    await setDoc(doc(this.firestore, 'users', credential.user.uid), {
      ...profil,
      creeLe: serverTimestamp()
    });
    return credential;
  }

  deconnexion() {
    return signOut(this.auth);
  }

  reinitialiserMotDePasse(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  // Profil Firestore de l'utilisateur connecté (null si non connecté).
  async profilCourant(): Promise<ProfilUtilisateur | null> {
    const user = await this.utilisateurCourant();
    if (!user) {
      return null;
    }
    const snap = await getDoc(doc(this.firestore, 'users', user.uid));
    const data = snap.exists() ? snap.data() : {};
    return {
      nom: data['nom'] ?? '',
      email: data['email'] ?? user.email ?? '',
      telephone: data['telephone'] ?? '',
      role: data['role'] as Role
    };
  }

  // Attend que Firebase ait restauré la session avant de répondre.
  utilisateurCourant(): Promise<User | null> {
    return firstValueFrom(authState(this.auth));
  }

  async getRole(uid: string): Promise<Role | null> {
    const snap = await getDoc(doc(this.firestore, 'users', uid));
    return snap.exists() ? (snap.data()['role'] as Role) : null;
  }

  routeDashboard(role: Role | null): string {
    switch (role) {
      case 'admin': return '/dashboard-admin';
      case 'repetiteur': return '/dashboard-repetiteur';
      case 'parent':
      case 'eleve': return '/dashboard-eleve';
      default: return '/login';
    }
  }
}
