import { Component, OnInit } from '@angular/core';
import { UserStatus } from "../services/user.status";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userStatus: UserStatus;
  private errorMessage: String;

  constructor(private userService: UserService, private router: Router ) {
  }

  ngOnInit() {
    this.userService.fetchStatus().subscribe(status => this.updateStatus(status),
        error => this.errorMessage = <any>error);
  }

  getLoginUrl(): string {
    return this.userStatus != null ? this.userStatus.url : '';
  }


  updateStatus(status: UserStatus) {
    this.userStatus = status;
    if (status.loggedIn) {
      this.router.navigate(['/edit']);
    }
  }
}
