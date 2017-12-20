import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { WishList } from "./wish-list";
import { Wish } from "./wish";

@Injectable()
export class WishService {
  private baseUrl: string = 'http://localhost:8080';

  public wishlistChanged = new EventEmitter<Date>();

  constructor(private http: Http) {
  }

  fetchWishList(): Observable<WishList[]> {
    this.wishlistChanged.emit(new Date());
    return this.http.get(this.baseUrl + '/wishlist/list').map(this.extractData)
        .catch(this.handleError);
  }

  fetchWishes(wishListId: number): Observable<Wish[]> {
    this.wishlistChanged.emit(new Date());
    return this.http.get(this.baseUrl + '/wish/list?list=' + wishListId).map(this.extractData)
        .catch(this.handleError);
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
