import { Injectable } from '@angular/core';
import { WishList } from "./wish-list";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { of } from "rxjs/observable/of";

const httpOptions = {
  withCredentials: true
}

@Injectable()
export class WishListService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<WishList[]> {
    return this.http.get<WishList[]>(this.baseUrl + '/wishlist/list', httpOptions).pipe(
        catchError(this.handleError<WishList[]>('wishlist/list')));
  }

  share(id: string): Observable<WishList[]> {
    return this.http.get<WishList[]>(this.baseUrl + '/wishlist/share?id=' + id, httpOptions)
        .pipe(catchError(this.handleError<WishList[]>('wishlist/share')));
  }

  create(event: string): Observable<WishList> {
    return this.http.get<WishList>(this.baseUrl + '/wishlist/create?event=' + event, httpOptions).pipe(
        catchError(this.handleError<WishList>('wishlist/create')));
  }

  delete(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + '/wishlist/delete?id=' + id, httpOptions).pipe(
        catchError(this.handleError<boolean>('wishlist/delete')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
