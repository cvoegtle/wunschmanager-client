import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Wish } from "../services/wish";
import { WishList } from "../services/wish-list";
import { WishService } from "../services/wish.service";
import { UserService } from "../services/user.service";
import { UserStatus } from "../services/user.status";

@Component({
  selector: 'wish-list-view',
  templateUrl: './wish-list-view.component.html',
  styleUrls: ['./wish-list-view.component.css']
})
export class WishListViewComponent implements OnInit {
  @Input() wishList: WishList;
  @Output() deleted = new EventEmitter<number>();

  wishes: Wish[];
  errorMessage: string;
  private userStatus: UserStatus;

  constructor(private wishService: WishService, private userService: UserService ) { }

  ngOnInit() {
    this.userService.fetchStatus().subscribe(status => this.userStatus = status);
  }

  panelOpened() {
    this.wishService.fetchWishes(this.wishList.id).subscribe(wishes => this.wishes = wishes,
        error => this.errorMessage = <any>error)
  }

  deleteClicked() {
    this.deleted.emit(this.wishList.id);
  }

  reserveClicked(wish: Wish) {
    this.wishService.reserve(this.wishList.id, wish.id).subscribe(updatedWish => wish.donor = updatedWish.donor,
        error => this.errorMessage = <any>error);
  }


}
