import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Income } from '../models/income';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class IncomeService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private incomeUrl = 'api/income';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`BoekjeService: ${message}`);
  }

  /** GET income from the server */
  getIncome(id: number): Observable<Income> {
    const url = `${this.incomeUrl}/${id}`;
    return this.http.get<Income>(url)
      .pipe(
        tap(_ => this.log(`fetched income id=${id}`)),
        catchError(this.handleError<Income>(`getIncome id=${id}`))
      );
  }
  
  /** GET income from the server */
  getIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(this.incomeUrl)
      .pipe(
        tap(_ => this.log('fetched income')),
        catchError(this.handleError<Income[]>('getIncome', []))
      );
  }

  /** PUT: update the income on the server */
  updateIncome(income: Income): Observable<any> {
    return this.http.put(this.incomeUrl, income, this.httpOptions).pipe(
      tap(_ => this.log(`updated income id=${income.id}`)),
      catchError(this.handleError<any>('updateIncome'))
    );
  }

  /** POST: add a new income to the server */
  addIncome(income: Income): Observable<Income> {
    return this.http.post<Income>(this.incomeUrl, income, this.httpOptions).pipe(
      tap((newIncome: Income) => this.log(`added income w/ id=${newIncome.id}`)),
      catchError(this.handleError<Income>('addIncome'))
    );
  }

  /** DELETE: delete the income from the server */
  deleteIncome(id: number): Observable<Income> {
    const url = `${this.incomeUrl}/${id}`;

    return this.http.delete<Income>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted income id=${id}`)),
      catchError(this.handleError<Income>('deleteIncome'))
    );
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
    

