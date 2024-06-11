import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, Subscriber} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Income } from '../models/income';
import { MessageService } from './message.service';
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, onSnapshot, collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import appsettings from "../../appsettings";

@Injectable({
  providedIn: 'root'
})

export class IncomeService {
  firestore: Firestore

  constructor(private messageService: MessageService, private http: HttpClient) {
    const app = initializeApp(appsettings.firebaseConfig)
    this.firestore = getFirestore(app);
  }

  private log(message: string) {
    this.messageService.add(`BoekjeService: ${message}`);
  }

  /** GET income from the server */
  getIncome(id: string): Observable<Income | undefined> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firestore, "transactions", id), (doc) => {
          let data = doc.data()
          if (data) {
            subscriber.next({
              id: doc.id,
              date: data['date'].toDate(),
              cash: data['cash'],
              description: data['description'],
              name: data['name'],
              category: data['category'],
            });
          }
          subscriber.next(null);
        });
      }
    })
  }

  /** GET income from the server */
  getIncomes(boekjeId: string): Observable<Income[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firestore, 'transactions'), (snapshot) => {
        let incomes: Income[] = []
        snapshot.forEach(x => {
          let income = {
            id: x.id,
            date: x.data()['date'].toDate(),
            cash: x.data()['cash'],
            description: x.data()['description'],
            name: x.data()['name'],
            category: x.data()['category'],
            boekjeId: x.data()['boekjeId']
          };
          if (income.boekjeId === boekjeId) {
            incomes.push(income);
          }
        })
        subscriber.next(incomes);
      })
    })
  }

  /** PUT: update the income on the server */
  updateIncome(income: Income): Observable<Income> {
    const { id, ...object } = Object.assign({}, income);
    return from(updateDoc(doc(this.firestore, "transactions", income.id), object).then(() => income));
  }

  /** POST: add a new income to the server */
  addIncome(income: Income): Observable<Income> {
    income.date = new Date();
    return from(addDoc(collection(this.firestore, 'transactions'), {
      date: income.date,
      cash: income.cash,
      description: income.description,
      name: income.name,
      category: income.category,
      boekjeId: income.boekjeId
    }).then(() => income));
  }

  /** DELETE: delete the income from the server */
  deleteIncome(incomeId: string): Observable<string> {
    return from(deleteDoc(doc(this.firestore, 'transactions', incomeId)).then(() => incomeId));
  }

  /** DELETE: delete all incomes from the server */
  deleteIncomesByCategory(category: string){
    onSnapshot(collection(this.firestore, 'transactions'), (snapshot) => {
      snapshot.forEach(x => {
        if (x.data()['category'] === category) {
          deleteDoc(doc(this.firestore, 'transactions', x.id))
        }
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


