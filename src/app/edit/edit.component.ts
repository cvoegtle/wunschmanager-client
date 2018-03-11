import { Component, OnInit } from '@angular/core';
import { WishList } from '../services/wish-list';
import { WishListService } from '../services/wish-list.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserStatus } from "../services/user.status";
import { ConfigurationService } from '../services/configuration.service';
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";
import { MatDialog } from '@angular/material';

@Component({
  selector: 'wish-editor',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  wishLists: WishList[];
  public newWishListEvent: string = "";
  public newListIsManaged: boolean = false;

  constructor(private configurationService: ConfigurationService,
              private userService: UserService,
              private wishListService: WishListService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.configurationService.isInitialised()) {
      this.fetchStatus();
    } else {
      this.configurationService.load().subscribe(_ => this.fetchStatus());
    }
  }

  private fetchStatus() {
    this.userService.fetchStatus().subscribe(status => this.checkStatus(status),
        _ => this.handleError('fetchStatus'))
  }

  private checkStatus(userStatus: UserStatus) {
    if (userStatus == null || !userStatus.loggedIn) {
      this.router.navigate(['/']);
    } else {
      this.fetchWishLists()
    }
  }

  private fetchWishLists(): void {
    this.wishListService.fetch().subscribe(wishLists => this.wishLists = wishLists,
        _ => this.handleError('fetchLists'));
  }

  createWishList() {
    this.wishListService.create(this.newWishListEvent, this.newListIsManaged)
        .subscribe(wishList => this.wishLists.push(wishList), _ => this.handleError('createList'));
    this.newWishListEvent = '';
    this.newListIsManaged = false;
  }

  onUpdateEvent(wishList: WishList) {
    this.wishListService.rename(wishList.id, wishList.event).subscribe(_ => {},
        _ => this.handleError('renameList'));
  }


  isCreatePossible(): boolean {
    return this.newWishListEvent.length > 0;
  }

  onDeleteList(id: number) {
    this.wishListService.delete(id).subscribe(result => {
      if (result) this.removeFromList(id)
    }, _ => this.handleError('deleteList'));
  }

  removeFromList(id: number) {
    for (let index = 0; index < this.wishLists.length; index++) {
      if (this.wishLists[index].id == id) {
        this.wishLists.splice(index, 1);
      }
    }
  }

  private handleError(action: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        action: action
      }
    });
  }

}
