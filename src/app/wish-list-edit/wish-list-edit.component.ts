import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishList } from "../services/wish-list";
import { Wish } from "../services/wish";
import { WishService } from "../services/wish.service";
import { MatDialog } from '@angular/material';
import { ShareDialogComponent } from "../share-dialog/share-dialog.component";
import { DeleteItemDialogComponent } from "../delete-item-dialog/delete-item-dialog.component";


@Component({
  selector: 'wish-list-edit',
  templateUrl: './wish-list-edit.component.html',
  styleUrls: ['./wish-list-edit.component.css']
})
export class WishListEditComponent implements OnInit {
  @Input() wishList: WishList;
  @Output() deleted = new EventEmitter<number>();

  wishes: Wish[];
  errorMessage: string;

  constructor(private wishService: WishService, private dialog: MatDialog) {
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

  wishChanged(wish: Wish) {
    this.wishService.update(this.wishList.id, wish).subscribe(result => {
          if (!result) {
            alert("Update fehlgeschlagen")
          }
        }, error => this.errorMessage = <any>error
    )
  }

  deleteWish(wish: Wish) {
    let deleteDialog = this.dialog.open(DeleteItemDialogComponent, {
      data: {
        item: this.getWishText(wish),
        id: wish.id
      }
    });

    deleteDialog.afterClosed().subscribe(dialogRet => {
      if (dialogRet) {
        this.doDeleteWish(dialogRet);
      }
    });
  }

  private doDeleteWish(wishId) {
    this.wishService.delete(this.wishList.id, wishId).subscribe(result => {
      if (result) this.removeFromList(wishId)
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
    let deleteDialog = this.dialog.open(DeleteItemDialogComponent, {
      data: {
        item: this.wishList.event,
        id: this.wishList.id
      }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if (result) this.deleted.emit(result);
    });
  }

  shareClicked() {
    this.dialog.open(ShareDialogComponent, {
      data: {
        url: this.createSharingUrl()
      }
    });
  }

  private createSharingUrl(): string {
    let baseUrl = window.location.href
    let endIndex = baseUrl.lastIndexOf('/');
    baseUrl = baseUrl.substr(0, endIndex);
    return baseUrl + "/?share=" + this.wishList.id;

  }

  private getWishText(wish: Wish) {
    if (wish.caption) {
      return wish.caption;
    } else {
      return wish.description;
    }
  }
}
