import { Injectable } from '@angular/core';
import { WishList } from "./wish-list";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";

@Injectable()
export class WishListService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<WishList[]> {
    return this.http.get<WishList[]>(this.baseUrl + '/wishlist/list').pipe(tap(_ => {}),
        catchError(this.handleError<WishList[]>('wishlist/list')));
  }

  create(event: string): Observable<WishList> {
    return this.http.get<WishList>(this.baseUrl + '/wishlist/create?event=' + event).pipe(tap(_ => {}),
        catchError(this.handleError<WishList>('wishlist/create')));
  }

  delete(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + '/wishlist/delete?id=' + id).pipe(tap(_ => {}),
        catchError(this.handleError<boolean>('wishlist/delete')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
