import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishList } from "../services/wish-list";
import { Wish } from "../services/wish";
import { WishService } from "../services/wish.service";
import { MatButton } from "@angular/material";

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

  constructor(private wishService: WishService) {
  }

  ngOnInit() {
  }

  panelOpened() {
    this.wishService.fetchWishes(this.wishList.id).subscribe(wishes => this.wishes = wishes,
            error => this.errorMessage = <any>error)
  }

  addWish() {
    this.wishService.add(this.wishList.id).subscribe(wish => this.wishes.push(wish),
        error => this.errorMessage = <any>error)
  }

  deleteClicked() {
    this.deleted.emit(this.wishList.id);
  }
}
