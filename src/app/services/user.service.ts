import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError, tap } from "rxjs/operators";
import { UserStatus } from "./user.status";
import { of } from "rxjs/observable/of";

const httpOptions = {
  withCredentials: true
}

@Injectable()
export class UserService {
  private baseUrl: string = 'http://localhost:8080';
  private lastUserStatus: Observable<UserStatus>;

  constructor(private http: HttpClient) {
  }

  fetchStatus(): Observable<UserStatus> {
    if (this.lastUserStatus == null) {
      this.lastUserStatus = this.http.get<UserStatus>(this.baseUrl + '/user/status?startUrl=' + window.location.href, httpOptions).pipe(
          catchError(this.handleError<UserStatus>('user/status')));
    }
    return this.lastUserStatus
  }

  clearStatus() {
    this.lastUserStatus = null;
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
