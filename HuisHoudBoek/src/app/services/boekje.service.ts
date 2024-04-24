import { Injectable } from '@angular/core';
import { Boekje } from '../boekje';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoekjeService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private boekjesUrl = 'api/boekjes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`BoekjeService: ${message}`);
  }

  /** GET boekje by id. Will 404 if id not found */
  getBoekje(id: number): Observable<Boekje> {
    const url = `${this.boekjesUrl}/${id}`;
    return this.http.get<Boekje>(url).pipe(
      tap(_ => this.log(`fetched boekje id=${id}`)),
      catchError(this.handleError<Boekje>(`getBoekje id=${id}`))
    );
  }

  /** GET boekjes from the server that are not archived*/
  getBoekjes(): Observable<Boekje[]> {
    return this.http.get<Boekje[]>(this.boekjesUrl)
      .pipe(
        map(boekjes => boekjes.filter(boekje => !boekje.archived)),
        tap(_ => this.log('fetched boekjes')),
        catchError(this.handleError<Boekje[]>('getBoekjes', []))
      );
  }

  /** GET boekjes from the server that are archived*/
  getBoekjesArchived(): Observable<Boekje[]> {
    return this.http.get<Boekje[]>(this.boekjesUrl)
      .pipe(
        map(boekjes => boekjes.filter(boekje => boekje.archived)),
        tap(_ => this.log('fetched boekjes')),
        catchError(this.handleError<Boekje[]>('getBoekjes', []))
      );
  }

  /** PUT: update the boekje on the server */
  updateBoekje(boekje: Boekje): Observable<any> {
    return this.http.put(this.boekjesUrl, boekje, this.httpOptions).pipe(
      tap(_ => this.log(`updated boekje id=${boekje.id}`)),
      catchError(this.handleError<any>('updateBoekje'))
    );
  }

  /** POST: add a new boekje to the server */
  addBoekje(boekje: Boekje): Observable<Boekje> {
    return this.http.post<Boekje>(this.boekjesUrl, boekje, this.httpOptions).pipe(
      tap((newBoekje: Boekje) => this.log(`added boekje w/ id=${newBoekje.id}`)),
      catchError(this.handleError<Boekje>('addBoekje'))
    );
  }

  /** DELETE: delete the boekje from the server */
  deleteBoekje(id: number): Observable<Boekje> {
    const url = `${this.boekjesUrl}/${id}`;

    return this.http.delete<Boekje>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted boekje id=${id}`)),
      catchError(this.handleError<Boekje>('deleteBoekje'))
    );
  }

  /* GET boekjees whose name contains search term */
  searchBoekjes(term: string): Observable<Boekje[]> {
    if (!term.trim()) {
      // if not search term, return empty boekje array.
      return of([]);
    }
    return this.http.get<Boekje[]>(`${this.boekjesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found boekjes matching "${term}"`) :
        this.log(`no boekjes matching "${term}"`)),
      catchError(this.handleError<Boekje[]>('searchBoekjes', []))
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
