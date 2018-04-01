import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wish } from "../services/wish";
import { makeValidUrl } from "../util/url-helper";
import { WishPropertiesComponent } from "../wish-properties/wish-properties.component";
import { MatDialog } from '@angular/material';

@Component({
  selector: 'wish-edit',
  templateUrl: './wish-edit.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishEditComponent implements OnInit {
  @Input() wish: Wish;
  @Output() wishDeleted = new EventEmitter<Wish>();
  @Output() wishChange = new EventEmitter<Wish>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  isAvailable(): boolean {
    return this.wish.donor == null && !this.wish.invisible;
  }

  isRed() {
    return this.isAvailable() && this.wish.background == "red";
  }

  isYellow() {
    return this.isAvailable() && this.wish.background == "yellow";
  }

  isGreen() {
    return this.isAvailable() && this.wish.background == "green";
  }

  isBlue() {
    return this.isAvailable() && this.wish.background == "blue";
  }

  deleteClicked() {
    this.wishDeleted.emit(this.wish);
  }

  onCaptionChange(event) {
    this.wish.caption = event.target.value;
    this.wishChange.emit(this.wish)
  }

  onDescriptionChange(event) {
    this.wish.description = event.target.value;
    this.wishChange.emit(this.wish)
  }

  onLinkChange(event) {
    this.wish.link = event.target.value;
    this.wishChange.emit(this.wish)
  }

  settingsClicked() {
    let settingsDialog = this.dialog.open(WishPropertiesComponent, {
      data: {
        wish: this.wish
      }
    });

    settingsDialog.afterClosed().subscribe(result => {
      if (result) this.wishChange.emit(this.wish);
    });
  }

  targetUrl() {
    return makeValidUrl(this.wish.link);
  }
}
