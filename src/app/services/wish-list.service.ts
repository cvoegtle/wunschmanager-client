import { Injectable } from '@angular/core';
import { WishList } from "./wish-list";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { of } from "rxjs/observable/of";
import { ConfigurationService } from "./configuration.service";

const httpOptions = {
  withCredentials: true
}

@Injectable()
export class WishListService {
  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
  }

  fetch(): Observable<WishList[]> {
    return this.http.get<WishList[]>(this.getBaseUrl() + '/wishlist/list', httpOptions).pipe(
        catchError(this.handleError<WishList[]>('wishlist/list')));
  }

  get(id: string): Observable<WishList> {
    return this.http.get<WishList>(this.getBaseUrl() + '/wishlist/get?id=' + id, httpOptions).pipe(
        catchError(this.handleError<WishList>('wishlist/get')));
  }


  rename(id: number, event: string): Observable<WishList> {
    return this.http.get<WishList>(this.getBaseUrl() + '/wishlist/rename?id=' + id + "&event=" + event, httpOptions)
        .pipe(catchError(this.handleError<WishList>('wishlist/rename')));

  }

  share(id: string): Observable<WishList[]> {
    return this.http.get<WishList[]>(this.getBaseUrl() + '/wishlist/share?id=' + id, httpOptions)
        .pipe(catchError(this.handleError<WishList[]>('wishlist/share')));
  }

  unshare(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.getBaseUrl() + '/wishlist/unshare?id=' + id, httpOptions)
        .pipe(catchError(this.handleError<boolean>('wishlist/unshare')));
  }

  fetchShared(): Observable<WishList[]> {
    return this.http.get<WishList[]>(this.getBaseUrl() + '/wishlist/shared', httpOptions)
        .pipe(catchError(this.handleError<WishList[]>('wishlist/shared')));
  }

  create(event: string, managed: boolean): Observable<WishList> {
    return this.http.get<WishList>(this.getBaseUrl() + '/wishlist/create?event=' + event + '&managed=' + managed,
        httpOptions).pipe(catchError(this.handleError<WishList>('wishlist/create')));
  }

  delete(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.getBaseUrl() + '/wishlist/delete?id=' + id, httpOptions).pipe(
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

  private getBaseUrl() {
    return this.configurationService.configuration.backendUrl;
  }

}
