import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ConfigurationService } from "../services/configuration.service";
import { WishListService } from "../services/wish-list.service";
import { WishList } from "../services/wish-list";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  wishList: WishList;
  errorMessage: string;

  constructor(private configurationService: ConfigurationService,
              private wishListService: WishListService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.configurationService.isInitialised()) {
      this.fetchWishList();
    } else {
      this.configurationService.load().subscribe(_ => this.fetchWishList());
    }
  }

  fetchWishList() {
    const id = this.route.snapshot.paramMap.get('id');
    this.wishListService.get(id).subscribe(wishList => this.wishList = wishList,
        error => this.errorMessage = <any>error)
  }


}