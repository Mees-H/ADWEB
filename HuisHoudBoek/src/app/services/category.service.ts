import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable, of } from 'rxjs';
import { catchError, tap, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private categoriesUrl = 'api/categories';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`BoekjeService: ${message}`);
  }

  /** GET categories from the server that are not archived*/
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        tap(_ => this.log('fetched categories')),
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  /** GET category by id. Will 404 if id not found */
  getCategory(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => this.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }

  /** POST add categories */
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions).pipe(
      tap((newCategory: Category) => this.log(`added category w/ id=${newCategory.id}`)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }

  /** PUT: update the category on the server */
  updateCategory(category: Category): Observable<any> {
    return this.http.put(this.categoriesUrl, category, this.httpOptions).pipe(
      tap(_ => this.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  /** DELETE: delete the category from the server */
  deleteCategory(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/${id}`;

    return this.http.delete<Category>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
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
