import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ConfigurationService } from "../services/configuration.service";
import { WishListService } from "../services/wish-list.service";
import { WishList } from "../services/wish-list";
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  wishList: WishList;

  constructor(private configurationService: ConfigurationService,
              private wishListService: WishListService,
              private route: ActivatedRoute,
              private dialog: MatDialog ) {
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
        _ => this.handleError('fetchLists'))
  }

  private handleError(action: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        action: action
      }
    });
  }

}
