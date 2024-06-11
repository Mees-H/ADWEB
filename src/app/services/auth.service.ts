import {inject, Injectable, signal} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user} from '@angular/fire/auth';
import {from, Observable} from "rxjs";
import firebase from "firebase/compat";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);

  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<User | null | undefined>(undefined)

  constructor() { }

  register(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(()=>{});
    console.log("user created")
    return from(promise)
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut().then(() => {});
    return from(promise);
  }

}
