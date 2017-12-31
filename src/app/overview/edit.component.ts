import { Component, OnInit } from '@angular/core';
import { WishList } from "../services/wish-list";
import { WishListService } from "../services/wish-list.service";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'wish-editor',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  wishLists: WishList[];
  public newWishListEvent: string = "";
  errorMessage: string;

  constructor(private userService: UserService, private router: Router, private wishListService: WishListService) {
  }

  ngOnInit() {
    let userStatus = this.userService.getLastUserStatus();
    if (userStatus == null || !userStatus.loggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.fetchWishLists()
    }
  }

  private fetchWishLists(): void {
    this.wishListService.fetch().subscribe(wishLists => this.wishLists = wishLists,
        error => this.errorMessage = <any>error);
  }

  createWishList() {
    this.wishListService.create(this.newWishListEvent).subscribe(wishList => this.wishLists.push(wishList),
        error => this.errorMessage = <any>error);
    this.newWishListEvent = "";
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
