import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Wish } from '../services/wish';
import { WishList } from '../services/wish-list';
import { WishService } from '../services/wish.service';
import { UserService } from '../services/user.service';
import { UserStatus } from '../services/user.status';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'wish-list-view',
  templateUrl: './wish-list-view.component.html',
  styleUrls: ['./wish-list-view.component.css']
})
export class WishListViewComponent implements OnInit {
  @Input() wishList: WishList;
  @Input() deleteEnabled: boolean = true;
  @Input() restricted: boolean = false;
  @Output() deleted = new EventEmitter<number>();

  wishes: Wish[];
  private userStatus: UserStatus;

  panelOpenState: boolean;

  constructor(private wishService: WishService, private userService: UserService, private dialog: MatDialog ) { }

  ngOnInit() {
    this.userService.fetchStatus().subscribe(status => this.userStatus = status);
  }

  panelOpened() {
    this.wishService.fetchWishes(this.wishList.id).subscribe(wishes => { this.wishes = wishes; this.panelOpenState = true },
        _ => this.handleError('fetchWishes'))
  }

  panelClosed() {
    this.panelOpenState = false;
  }

  deleteClicked() {
    this.deleted.emit(this.wishList.id);
  }

  reserveClicked(wish: Wish) {
    this.wishService.reserve(this.wishList.id, wish.id).subscribe(updatedWish => wish.donor = updatedWish.donor,
        _ => this.handleError('reserveWish'));
  }

  private handleError(action: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        action: action
      }
    });
  }

}
