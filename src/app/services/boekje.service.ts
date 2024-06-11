import { Injectable } from '@angular/core';
import { Boekje } from '../models/boekje';
import { Observable, of, Subscriber, from } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, onSnapshot, collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import appsettings from "../../appsettings";


@Injectable({
  providedIn: 'root'
})
export class BoekjeService {

  firestore: Firestore

  constructor(private messageService: MessageService, private http: HttpClient) { 
    const app = initializeApp(appsettings.firebaseConfig)
    this.firestore = getFirestore(app);
  }

  private log(message: string) {
    this.messageService.add(`BoekjeService: ${message}`);
  }

  /** GET boekje by id. Will 404 if id not found */
  getBoekje(id: string): Observable<Boekje | undefined> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firestore, "boekjes", id), (doc) => {
          let data = doc.data()
          if (data) {
            subscriber.next({
              id: doc.id,
              name: data['name'],
              description: data['description'],
              archived: data['archived']
            });
          }
          subscriber.next(null);
        });
      }
    })
  }

  /** GET boekjes from the server that are not archived */
getBoekjes(): Observable<Boekje[]> {
  return new Observable((subscriber: Subscriber<any[]>) => {
    onSnapshot(collection(this.firestore, 'boekjes'), (snapshot) => {
      let boekjes: Boekje[] = []
      snapshot.forEach(x => {
        let boekje = {
          id: x.id,
          name: x.data()['name'],
          description: x.data()['description'],
          archived: x.data()['archived']
        };
        if (!boekje.archived) {
          boekjes.push(boekje);
        }
        console.log(boekjes);
      })
      subscriber.next(boekjes);
    })
  })
}

/** GET boekjes from the server that are archived */
getBoekjesArchived(): Observable<Boekje[]> {
  return new Observable((subscriber: Subscriber<any[]>) => {
    onSnapshot(collection(this.firestore, 'boekjes'), (snapshot) => {
      let boekjes: Boekje[] = []
      snapshot.forEach(x => {
        let boekje = {
          id: x.id,
          name: x.data()['name'],
          description: x.data()['description'],
          archived: x.data()['archived']
        };
        if (boekje.archived) {
          boekjes.push(boekje);
        }
      })
      subscriber.next(boekjes);
    })
  })
}

  /** PUT: update the boekje on the server */
  updateBoekje(boekje: Boekje): Observable<Boekje> {
    const { id, ...object } = Object.assign({}, boekje);
    return from(updateDoc(doc(this.firestore, "boekjes", boekje.id), object).then(() => boekje));
  }

  /** POST: add a new boekje to the server */
  addBoekje(boekje: Boekje): Observable<Boekje> {
    boekje.archived = false;
    return from(addDoc(collection(this.firestore, 'boekjes'), {
      name: boekje.name,
      description: boekje.description,
      archived: boekje.archived
    }).then(() => boekje));
  }

  /** DELETE: delete the boekje from the server */
  deleteBoekje(boekjeId: string): Observable<string> {
    return from(deleteDoc(doc(this.firestore, 'boekjes', boekjeId)).then(() => boekjeId));
  }

  /* GET boekjees whose name contains search term */
   /* GET boekjees whose name contains search term */
   searchBoekjes(term: string): Observable<Boekje[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      if (!term.trim()) {
        // if not search term, return empty boekje array.
        subscriber.next([]);
      } else {
        onSnapshot(collection(this.firestore, 'boekjes'), (snapshot) => {
          let boekjes: Boekje[] = []
          snapshot.forEach(x => {
            let boekje = {
              id: x.id,
              name: x.data()['name'],
              description: x.data()['description'],
              archived: x.data()['archived']
            };
            if (boekje.name.includes(term)) {
              boekjes.push(boekje);
            }
          })
          subscriber.next(boekjes);
        })
      }
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
