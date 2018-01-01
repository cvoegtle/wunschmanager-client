import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Wish } from "../services/wish";
import { WishList } from "../services/wish-list";
import { WishService } from "../services/wish.service";

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

  constructor(private wishService: WishService ) { }

  ngOnInit() {
  }

  panelOpened() {
    this.wishService.fetchWishes(this.wishList.id).subscribe(wishes => this.wishes = wishes,
        error => this.errorMessage = <any>error)
  }

  deleteClicked() {
    this.deleted.emit(this.wishList.id);
  }



}
