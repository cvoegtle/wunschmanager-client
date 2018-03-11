import { Component, OnInit } from '@angular/core';
import { WishList } from '../services/wish-list';
import { WishListService } from '../services/wish-list.service';
import { ConfigurationService } from '../services/configuration.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'all-shared',
  templateUrl: './all-shared.component.html',
  styleUrls: ['./all-shared.component.css']
})
export class AllSharedComponent implements OnInit {
  wishLists: WishList[];

  constructor(private configurationService: ConfigurationService,
              private wishListService: WishListService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.configurationService.isInitialised()) {
      this.fetchSharedWishLists();
    } else {
      this.configurationService.load().subscribe(_ => this.fetchSharedWishLists());
    }
  }

  private fetchSharedWishLists() {
    this.wishListService.fetchShared().subscribe(wishLists => this.wishLists = wishLists,
        _ => this.handleError('fetchSharedLists'));
  }

  onDeleteList(wishListId: number) {

    this.wishListService.unshare(wishListId).subscribe(deleted => this.handleResponse(deleted, wishListId),
        _ => this.handleError('unshareList'));
  }

  public handleResponse(deleted: boolean, wishListId) {
    let index = this.wishLists.findIndex(it => it.id == wishListId);
    if (index >= 0) {
      this.wishLists.splice(index, 1);
    }
  }

  private handleError(action: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        action: action
      }
    });
  }

}
