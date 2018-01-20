import { Component, OnInit } from '@angular/core';
import { WishList } from "../services/wish-list";
import { WishListService } from "../services/wish-list.service";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { UserStatus } from "../services/user.status";
import { ConfigurationService } from "../services/configuration.service";

@Component({
  selector: 'wish-editor',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  wishLists: WishList[];
  public newWishListEvent: string = "";
  public newListIsManaged:boolean = false;
  errorMessage: string;

  constructor(private configurationService: ConfigurationService,
              private userService: UserService,
              private wishListService: WishListService,
              private router: Router) {
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
        error => this.errorMessage = <any>error)
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
        error => this.errorMessage = <any>error);
  }

  createWishList() {
    this.wishListService.create(this.newWishListEvent, this.newListIsManaged).
    subscribe(wishList => this.wishLists.push(wishList), error => this.errorMessage = <any>error);
    this.newWishListEvent = "";
    this.newListIsManaged = false;
  }

  isCreatePossible(): boolean {
    return this.newWishListEvent.length > 0;
  }

  onDeleteList(id: number) {
    this.wishListService.delete(id).subscribe(result => {
      if (result) this.removeFromList(id)
    }, error => this.errorMessage = <any>error);
  }

  removeFromList(id: number) {
    for (let index = 0; index < this.wishLists.length; index++) {
      if (this.wishLists[index].id == id) {
        this.wishLists.splice(index, 1);
      }
    }
  }

}
