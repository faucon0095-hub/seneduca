import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
provideFirebaseApp(() => initializeApp({
  apiKey: "AIzaSyDBR4ip_Q2aH-Do-kd45UB1J2Q4ku57K68",
  authDomain: "seneduca-5b45e.firebaseapp.com",
  projectId: "seneduca-5b45e",
  storageBucket: "seneduca-5b45e.firebasestorage.app",
  messagingSenderId: "914023471901",
  appId: "1:914023471901:web:c61a8657aa8a5986b1dff4"
})),    provideAuth(() => getAuth())
  ]
};