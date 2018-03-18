import { Component, OnInit } from '@angular/core';
import { WishList } from '../services/wish-list';
import { WishListService } from '../services/wish-list.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserStatus } from "../services/user.status";
import { ConfigurationService } from '../services/configuration.service';
import { ErrorHandler } from '../error-handler/error-handler.component';

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
              private errorHandler: ErrorHandler) {
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
        _ => this.errorHandler.handle('fetchStatus'))
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
        _ => this.errorHandler.handle('fetchLists'));
  }

  createWishList() {
    this.wishListService.create(this.newWishListEvent, this.newListIsManaged)
        .subscribe(wishList => this.wishLists.push(wishList), _ => this.errorHandler.handle('createList'));
    this.newWishListEvent = '';
    this.newListIsManaged = false;
  }

  onUpdateEvent(wishList: WishList) {
    this.wishListService.update(wishList).subscribe(_ => {
        },
        _ => this.errorHandler.handle('renameList'));
  }


  isCreatePossible(): boolean {
    return this.newWishListEvent.length > 0;
  }

  onDeleteList(id: number) {
    this.wishListService.delete(id).subscribe(result => {
      if (result) this.removeFromList(id)
    }, _ => this.errorHandler.handle('deleteList'));
  }

  removeFromList(id: number) {
    for (let index = 0; index < this.wishLists.length; index++) {
      if (this.wishLists[index].id == id) {
        this.wishLists.splice(index, 1);
      }
    }
  }

}
