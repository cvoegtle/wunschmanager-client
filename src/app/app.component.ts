import { Component, OnInit } from '@angular/core';
import { UserService } from "./services/user.service";
import { UserStatus } from "./services/user.status";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfigurationService } from "./services/configuration.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  userStatus: UserStatus;
  errorMessage: string;

  constructor(private configurationService: ConfigurationService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.configurationService.isInitialised()) {
      this.fetchStatus();
    } else {
      this.configurationService.load().subscribe(_ => this.fetchStatus());
    }
  }

  private fetchStatus() {
    return this.userService.fetchStatus().subscribe(status => this.userStatus = status,
        error => this.errorMessage = <any>error);
  }

  isAwayFromHome() {
    return window.location.pathname.indexOf("login") < 0 && window.location.pathname.indexOf("edit") < 0;
  }

  homeClicked() {
    this.router.navigate(['/edit'])
  }

  logoutClicked(): void {
    this.userService.clearStatus();
    let logoutUrl = this.userStatus.url;
    logoutUrl = logoutUrl.substr(0, logoutUrl.indexOf("=") + 1) + window.location.href;
    window.location.href = logoutUrl;
  }

  isLoggedIn(): boolean {
    return this.userStatus != null && this.userStatus.loggedIn;
  }
}
