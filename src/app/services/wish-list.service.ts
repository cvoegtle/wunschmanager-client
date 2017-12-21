import { Injectable } from '@angular/core';
import { WishList } from "./wish-list";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";

@Injectable()
export class WishListService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: Http) {
  }

  fetch(): Observable<WishList[]> {
    return this.http.get(this.baseUrl + '/wishlist/list').map(this.extractData).catch(this.handleError);
  }

  create(event: string): Observable<WishList> {
    return this.http.get(this.baseUrl + '/wishlist/create?event=' + event).map(this.extractData).catch(this.handleError);
  }

  delete(id: number): Observable<boolean> {
    return this.http.get(this.baseUrl + '/wishlist/delete?id=' + id).map(this.extractData).catch(this.handleError);
  }

  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
