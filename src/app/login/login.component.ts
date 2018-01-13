import { Component, OnInit } from '@angular/core';
import { UserStatus } from "../services/user.status";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { ConfigurationService } from "../services/configuration.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userStatus: UserStatus;
  private errorMessage: String;

  constructor(private configurationService: ConfigurationService, private userService: UserService, private router: Router ) {
  }

  ngOnInit() {
    if (this.configurationService.isInitialised()) {
      this.fetchStatus();
    } else {
      this.configurationService.load().subscribe(_ => this.fetchStatus());
    }
  }

  private fetchStatus() {
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
