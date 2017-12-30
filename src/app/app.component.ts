import { Component, OnInit } from '@angular/core';
import { UserService } from "./services/user.service";
import { UserStatus } from "./services/user.status";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  userStatus: UserStatus;
  errorMessage: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.fetchStatus().subscribe(status => this.userStatus = status,
            error => this.errorMessage = <any>error)
  }

  logoutClicked(): void {
    let logoutUrl = this.userStatus.url;
    this.userService.clearStatus();
    window.location.href = this.userStatus.url
  }

  isLoggedIn(): boolean {
    return this.userStatus != null && this.userStatus.loggedIn;
  }
}
