import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isSignIn: boolean = false;
  constructor(public auth: Auth) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        localStorage.setItem('access_token', idToken);
        this.isSignIn = true;
      } else {
        this.isSignIn = false;
      }
    });
  }

  async signInClick() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.idToken) {
        console.log('User signed in');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async signOutClick() {
    try {
      await signOut(this.auth);

      localStorage.removeItem('access_token');
      this.isSignIn = false;

      console.log('User signed out');
    } catch (error) {
      console.error(error);
    }
  }
}
