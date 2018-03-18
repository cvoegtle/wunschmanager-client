import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { UserStatus } from "./user.status";
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
      this.lastUserStatus = this.http.get<UserStatus>(`${this.getBaseUrl()}/user/status?startUrl=${this.getApplicationUrl()}&unique=${new Date()}`, httpOptions).pipe(
          catchError(this.handleError<UserStatus>('user/status')));
    }
    return this.lastUserStatus
  }

  getApplicationUrl() {
    return window.location.href;
  }


  clearStatus() {
    this.lastUserStatus = null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return null;
    };
  }

  private getBaseUrl() {
    return this.configurationService.configuration.backendUrl;
  }

}
