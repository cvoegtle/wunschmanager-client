import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { UserStatus } from "./user.status";
import { of } from "rxjs/observable/of";
import { ConfigurationService } from "./configuration.service";

const httpOptions = {
  withCredentials: true
}

@Injectable()
export class UserService {
  private lastUserStatus: Observable<UserStatus>;

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
  }

  fetchStatus(): Observable<UserStatus> {
    if (this.lastUserStatus == null) {
      this.lastUserStatus = this.http.get<UserStatus>(this.getBaseUrl() + '/user/status?startUrl=' + window.location.href, httpOptions).pipe(
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

  private getBaseUrl() {
    return this.configurationService.configuration.backendUrl;
  }

}
