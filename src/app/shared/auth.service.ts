//this file is for firebase
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  //login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');

        if (res.user?.emailVerified == true) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['/verify-email']);
        }
      },
      (err) => {
        alert('Incorrect login credentials. Please try again. ');
        this.router.navigate(['/login']);
      }
    );
  }

  //register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration is Successful');
        this.router.navigate(['/login']);
        this.sendEmailForVerification(res.user);
      },
      (err) => {
        alert('Something went wrong');
        this.router.navigate(['/register']);
      }
    );
  }
  //forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/reset-pass']);
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
  // log out
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  //email verification
  sendEmailForVerification(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['verify-email']);
      },
      (err: any) => {
        alert('Something went wrong. Email verification mail unsuccessful');
      }
    );
  }
}
