import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishList } from "../services/wish-list";
import { Wish } from "../services/wish";
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

  deleteWish(id: number) {
    this.wishService.delete(id).subscribe(result => {
      if (result) this.removeFromList(id)
    }, error => this.errorMessage = <any>error)
  }

  removeFromList(id: number) {
    for (let index = 0; index < this.wishes.length; index++) {
      if (this.wishes[index].id == id) {
        this.wishes.splice(index, 1);
      }
    }
  }

  deleteClicked() {
    this.deleted.emit(this.wishList.id);
  }
}
