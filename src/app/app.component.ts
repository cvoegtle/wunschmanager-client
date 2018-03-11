import { Component, OnInit } from '@angular/core';
import { UserService } from "./services/user.service";
import { UserStatus } from "./services/user.status";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfigurationService } from "./services/configuration.service";
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  userStatus: UserStatus;

  constructor(private configurationService: ConfigurationService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
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
        _ => this.handleError('fetchStatus'));
  }

  isAwayFromHome() {
    return window.location.pathname.indexOf("share") >= 0;
  }

  homeClicked() {
    this.router.navigate(['/edit'])
  }

  logoutClicked(): void {
    this.userService.clearStatus();
    let logoutUrl = this.userStatus.url;
    window.location.href = logoutUrl;
  }

  isLoggedIn(): boolean {
    return this.userStatus != null && this.userStatus.loggedIn;
  }

  private handleError(action: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        action: action
      }
    });

  }
}
