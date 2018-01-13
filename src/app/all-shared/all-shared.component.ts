import { Component, OnInit } from '@angular/core';
import { WishList } from "../services/wish-list";
import { WishListService } from "../services/wish-list.service";

@Component({
  selector: 'all-shared',
  templateUrl: './all-shared.component.html',
  styleUrls: ['./all-shared.component.css']
})
export class AllSharedComponent implements OnInit {
  wishLists: WishList[];
  errorMessage: string;

  constructor(private wishListService: WishListService) { }

  ngOnInit() {
    this.wishListService.fetchShared().subscribe(wishLists => this.wishLists = wishLists,
        error => this.errorMessage = <any>error);

  }

  onDeleteList(wishListId: number) {

    this.wishListService.unshare(wishListId).subscribe(deleted => this.handleResponse(deleted, wishListId),
        error => this.errorMessage = <any>error);
  }

  public handleResponse(deleted: boolean, wishListId) {
    let index = this.wishLists.findIndex(it => it.id == wishListId);
    if (index >= 0) {
      this.wishLists.splice(index, 1);
    }
  }


}