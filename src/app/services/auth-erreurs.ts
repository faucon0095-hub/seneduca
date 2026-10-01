// Traduit les codes d'erreur Firebase Auth en messages clairs en français.
export function messageErreurAuth(error: unknown): string {
  const code = (error as { code?: string })?.code ?? '';
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Cet email est déjà utilisé par un autre compte.';
    case 'auth/invalid-email':
      return 'L\'adresse email n\'est pas valide.';
    case 'auth/weak-password':
      return 'Le mot de passe est trop court (6 caractères minimum).';
    case 'auth/missing-password':
      return 'Veuillez saisir un mot de passe.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
    case 'auth/user-not-found':
      return 'Email ou mot de passe incorrect.';
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Patientez quelques minutes avant de réessayer.';
    case 'auth/network-request-failed':
      return 'Problème de réseau. Vérifiez votre connexion internet et réessayez.';
    default:
      return 'Une erreur est survenue. Veuillez réessayer.';
  }
}
