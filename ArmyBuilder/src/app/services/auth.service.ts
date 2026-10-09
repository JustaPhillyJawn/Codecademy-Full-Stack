import { Injectable } from '@angular/core';
import { FirebaseError } from 'firebase/app';
import { GoogleAuthProvider, linkWithPopup, signInAnonymously, signInWithCredential, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '../firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserId: string | null = null;
  private localSessionUserId: string | null = null;

  async initializeUser(): Promise<string> {
    if (this.currentUserId) {
      return this.currentUserId;
    }

    if (auth.currentUser) {
      this.currentUserId = auth.currentUser.uid;
      return this.currentUserId;
    }

    if (this.localSessionUserId) {
      this.currentUserId = this.localSessionUserId;
      return this.currentUserId;
    }

    try {
      const credentials = await signInAnonymously(auth);
      this.currentUserId = credentials.user.uid;
      return this.currentUserId;
    } catch {
      this.localSessionUserId = `local-${Date.now()}`;
      this.currentUserId = this.localSessionUserId;
      return this.currentUserId;
    }
  }

  getCurrentUserId(): string {
    return this.currentUserId ?? this.localSessionUserId ?? 'anonymous';
  }

  isAuthenticated(): boolean {
    return Boolean(auth.currentUser && !auth.currentUser.isAnonymous);
  }

  getDisplayUserLabel(): string {
    if (auth.currentUser && !auth.currentUser.isAnonymous) {
      return auth.currentUser.email
        ? `Operative ${auth.currentUser.email}`
        : 'Authenticated Operative';
    }

    return 'Anonymous Operative';
  }

  async signIn(): Promise<string> {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');

    try {
      if (auth.currentUser) {
        if (auth.currentUser.isAnonymous) {
          const credentials = await linkWithPopup(auth.currentUser, provider);
          this.currentUserId = credentials.user.uid;
          this.localSessionUserId = null;
          return this.currentUserId;
        }

        this.currentUserId = auth.currentUser.uid;
        return this.currentUserId;
      }

      const credentials = await signInWithPopup(auth, provider);
      this.currentUserId = credentials.user.uid;
      this.localSessionUserId = null;
      return this.currentUserId;
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/credential-already-in-use') {
        const credential = GoogleAuthProvider.credentialFromError(error);
        if (credential) {
          const credentials = await signInWithCredential(auth, credential);
          this.currentUserId = credentials.user.uid;
          this.localSessionUserId = null;
          return this.currentUserId;
        }
      }

      throw error;
    }
  }

  getSignInErrorMessage(error: unknown): string {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/unauthorized-domain': {
          const hostname = typeof window === 'undefined' ? 'this domain' : window.location.hostname;
          return `This site (${hostname}) is not authorized for Google sign-in. Add ${hostname} to Firebase Authentication authorized domains.`;
        }
        case 'auth/operation-not-allowed':
          return 'Google sign-in is not enabled for this Firebase project.';
        case 'auth/popup-blocked':
          return 'The sign-in popup was blocked. Allow popups for this site and try again.';
        case 'auth/popup-closed-by-user':
          return 'The Google sign-in window was closed before sign-in finished.';
        case 'auth/credential-already-in-use':
          return 'That Google account is already linked to another ArmyBuilder account. Sign in again to use it.';
        default:
          return `Google sign-in failed (${error.code}). ${error.message}`;
      }
    }

    if (error instanceof Error) {
      return `Google sign-in failed. ${error.message}`;
    }

    return 'Google sign-in failed. Check the Firebase Authentication configuration and try again.';
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch {
    }

    this.currentUserId = 'anonymous';
    this.localSessionUserId = null;
  }
}
