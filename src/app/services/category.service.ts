import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import {Observable, of, Subscriber} from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';
import {addDoc, collection, deleteDoc, doc, Firestore, getFirestore, onSnapshot, updateDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import appsettings from "../../appsettings";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  firestore: Firestore

  constructor(private messageService: MessageService, private http: HttpClient) {
    const app = initializeApp(appsettings.firebaseConfig)
    this.firestore = getFirestore(app);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`BoekjeService: ${message}`);
  }

  /** GET categories from the server that are not archived*/
  getCategories(): Observable<Category[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firestore, 'categories'), {
        next: (snapshot) => {
          let categories: Category[] = []
          snapshot.forEach(x => {
            categories.push({
              id: x.id,
              name: x.data()['name'],
              description: x.data()['description'],
              max_budget: x.data()['max_budget'],
              end_date: x.data()['end_date'],
              incomes: []
            });
          })
          subscriber.next(categories);
        },
        error: (error) => subscriber.error(error.message)
      })
    })
  }

  /** GET category by id. Will 404 if id not found */
  getCategory(id: string): Observable<Category | undefined> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firestore, "categories", id), {
          next: (doc) => {
            let data = doc.data()
            if (data) {
              subscriber.next({
                id: doc.id,
                name: data['name'],
                description: data['description'],
                max_budget: data['max_budget'],
                end_date: data['end_date'],
                incomes: []
              });
            }
            subscriber.next(null);
          },
          error: (error) => subscriber.error(error.message)
        });
      }
    })
  }

  /** POST add categories */
  addCategory(category: Category): Observable<Category> {
    return from(addDoc(collection(this.firestore, 'categories'), {
      description: category.description,
      name: category.name,
      max_budget: category.max_budget,
      end_date: category.end_date,
      incomes: []
    }).then(() => category));
  }

  /** PUT: update the category on the server */
  updateCategory(category: Category): Observable<Category> {
    const { id, ...object } = Object.assign({}, category);
    if (object.end_date === undefined) {
      object.end_date = null;
    }
    return from(updateDoc(doc(this.firestore, "categories", category.id), object).then(() => category));
  }

  /** DELETE: delete the category from the server */
  deleteCategory(id: string): Observable<string> {
    return from(deleteDoc(doc(this.firestore, 'categories', id)).then(() => id));
  }

  /** GET all incomes cash matching category */
  getIncomesCash(category: string): Observable<number> {
    return new Observable((subscriber: Subscriber<number>) => {
      onSnapshot(collection(this.firestore, 'transactions'), {
        next: (snapshot) => {
          let totalIncome = 0;
          snapshot.forEach(x => {
            if (x.data()['category'] === category) {
              totalIncome += x.data()['cash'];
            }
          })
          subscriber.next(totalIncome);
        },
        error: (error) => subscriber.error(error.message)
      })
    })
  }


}
