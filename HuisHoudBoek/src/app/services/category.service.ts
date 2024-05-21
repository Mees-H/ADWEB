import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import {Observable, of, Subscriber} from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';
import {addDoc, collection, deleteDoc, doc, Firestore, getFirestore, onSnapshot, updateDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import appsettings from "../../appsettings";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  firestore: Firestore

  constructor(private messageService: MessageService, private http: HttpClient) {
    const app = initializeApp(appsettings.firebaseConfig)
    this.firestore = getFirestore(app);
  }

  private categoriesUrl = 'api/categories';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`BoekjeService: ${message}`);
  }

  /** GET categories from the server that are not archived*/
  getCategories(): Observable<Category[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firestore, 'categories'), (snapshot) => {
        let categories: Category[] = []
        snapshot.forEach(x => {
          categories.push({
            id: x.id,
            description: x.data()['description'],
            name: x.data()['name'],
            incomes: []
          });
        })
        subscriber.next(categories);
      })
    })
  }

  /** GET category by id. Will 404 if id not found */
  getCategory(id: string): Observable<Category> | undefined {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firestore, "categories", id), (doc) => {
          let data = doc.data()
          if (data) {
            subscriber.next({
              id: doc.id,
              description: data['description'],
              name: data['name'],
              incomes: []
            });
          }
          subscriber.next(null);
        });
      }
    })
  }

  /** POST add categories */
  addCategory(category: Category) {
    addDoc(collection(this.firestore, 'categories'), {
      description: category.description,
      name: category.name,
      incomes: []
    })
  }

  /** PUT: update the category on the server */
  updateCategory(category: Category) {
    const { id, ...object } = Object.assign({}, category);
    updateDoc(doc(this.firestore, "categories", category.id), object);
  }

  /** DELETE: delete the category from the server */
  deleteCategory(id: string) {
    deleteDoc(doc(this.firestore, 'categories', id))
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
