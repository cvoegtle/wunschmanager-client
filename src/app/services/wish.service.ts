import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Wish } from "./wish";
import { catchError, map, tap } from 'rxjs/operators';
import { of } from "rxjs/observable/of";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WishService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  fetchWishes(wishListId: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(this.baseUrl + '/wish/list?list=' + wishListId).pipe(tap(_ => {}),
        catchError(this.handleError<Wish[]>('wish/list')));
  }

  add(wishListId: number): Observable<Wish> {
    return this.http.get<Wish>(this.baseUrl + '/wish/create?list=' + wishListId).pipe(tap(_ => {}),
        catchError(this.handleError<Wish>('wish/create')));
  }

  delete(listId: number, wishId: number): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + `/wish/delete?listId=${listId}&wishId=${wishId}`).pipe(tap(_ => {}),
        catchError(this.handleError<boolean>('wish/delete')));
  }

  update(listId: number, wish: Wish): Observable<boolean> {
    let updateRequest = { listId: listId, wish: wish };
    return this.http.post<boolean>(this.baseUrl + '/wish/update', updateRequest, httpOptions).pipe(tap(_ => {}),
        catchError(this.handleError<boolean>('wish/update')));
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
