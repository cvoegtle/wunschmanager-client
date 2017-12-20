import { Component, OnInit } from '@angular/core';
import { WishService } from "../services/wish.service";
import { WishList } from "../services/wish-list";

@Component({
  selector: 'wish-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  wishLists: WishList[];
  errorMessage: string;

  constructor(private wishService: WishService) { }

  ngOnInit() {
    this.fetchWishLists()
  }

  private fetchWishLists(): void {
    this.wishService.fetchWishList().subscribe(wishLists => this.wishLists = wishLists,
        error => this.errorMessage = <any>error, () => this.processWishLists());
  }


  private processWishLists() {
  }
}
