import {inject, Injectable} from '@angular/core';
import { Boekje } from '../models/boekje';
import {Observable, of, Subscriber, from} from 'rxjs';
import { MessageService } from './message.service';
import {addDoc, collection, deleteDoc, doc, Firestore, getFirestore, onSnapshot, updateDoc} from "firebase/firestore";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {initializeApp} from "firebase/app";
import appsettings from "../../appsettings";
import {Category} from "../models/category";
import {AuthService} from "./auth.service";
import {and, query, where} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class BoekjeService {
  firestore: Firestore
  authService = inject(AuthService);
  booksCollection;

  constructor() {
    const app = initializeApp(appsettings.firebaseConfig)
    this.firestore = getFirestore(app);
    this.booksCollection = collection(this.firestore, 'books');
  }

  /** GET boekje by id. Will 404 if id not found */
  getBoekje(id: string): Observable<Boekje> {

    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firestore, "books", id), (doc) => {
          let data = doc.data()
          if (data) {

            const boekje: Boekje ={
              id: doc.id,
              name: data['name'],
              description: data['description'],
              archived: data['archived'],
              userIds: data['userIds']
            }
            subscriber.next(boekje);
          }
          subscriber.next(null);
        });
      }
    })
  }

  /** GET boekjes from the server that are not archived*/
  getBoekjes(): Observable<Boekje[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      if(this.authService.currentUserSignal() == null) {
        subscriber.next([]);
        return;
      }

      const selection = query(collection(this.firestore, 'books'), and(
        where('userIds', 'array-contains', this.authService.currentUserSignal()!.email),
        where('archived', '==', false))
      );

      onSnapshot(selection, (snapshot) => {
        let boekjes: Boekje[] = []
        snapshot.forEach(x => {
            boekjes.push({
              id: x.id,
              name: x.data()['name'],
              description: x.data()['description'],
              archived: x.data()['archived'],
              userIds: x.data()['userIds']
            });
        })
        subscriber.next(boekjes);
      })
    })
  }

  /** GET boekjes from the server that are archived*/
  getBoekjesArchived(): Observable<Boekje[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      if(this.authService.currentUserSignal() == null) {
        subscriber.next([]);
        return;
      }

      const selection = query(collection(this.firestore, 'books'), and(
        where('userIds', 'array-contains', this.authService.currentUserSignal()!.email),
        where('archived', '==', true))
      );

      onSnapshot(selection, (snapshot) => {
        let boekjes: Boekje[] = []
        snapshot.forEach(x => {
          boekjes.push({
            id: x.id,
            name: x.data()['name'],
            description: x.data()['description'],
            archived: x.data()['archived'],
            userIds: x.data()['userIds']
          });
        })
        subscriber.next(boekjes);
      })
    })
  }

  /** PUT: update the boekje on the server */
  updateBoekje(boekje: Boekje): Observable<Boekje> {
    const { id, ...object } = Object.assign({}, boekje);
    return from(updateDoc(doc(this.firestore, "books", boekje.id), object).then(() => boekje));
  }

  /** POST: add a new boekje to the server */
  addBoekje(boekje: Boekje): Observable<Boekje> {
    const user = this.authService.currentUserSignal();
    const users = user != null ? [user.email] : [];
    console.log(users)
    return from(addDoc(collection(this.firestore, 'books'), {
      name: boekje.name,
      description: boekje.description,
      archived: false,
      userIds: users
    }).then(() => boekje));
  }

  /** DELETE: delete the boekje from the server */
  deleteBoekje(id: string): Observable<string> {
    return from(deleteDoc(doc(this.firestore, 'books', id)).then(() => id));
  }

  /* GET boekjees whose name contains search term */
  searchBoekjes(term: string): Observable<Boekje[]> {
    if (!term.trim()) {
      // if not search term, return empty boekje array.
      return of([]);
    }
    return new Observable((subscriber: Subscriber<any[]>) => {
      const selection = query(collection(this.firestore, 'books'), and(
        where('userIds', 'array-contains', this.authService.currentUserSignal()!.id),
        where('name', '==', term))
      );

      onSnapshot(selection, (snapshot) => {
        let boekjes: Boekje[] = []
        snapshot.forEach(x => {
            boekjes.push({
              id: x.id,
              name: x.data()['name'],
              description: x.data()['description'],
              archived: x.data()['archived'],
              userIds: x.data()['userIds']
            });
        })

        subscriber.next(boekjes);
      })
    })
  }

 /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
