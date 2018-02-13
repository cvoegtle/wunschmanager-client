import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wish } from "../services/wish";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'wish-edit',
  templateUrl: './wish-edit.component.html',
  styleUrls: ['./wish-edit.component.css']
})
export class WishEditComponent implements OnInit {
  @Input() wish: Wish;
  @Output() wishDeleted = new EventEmitter<Wish>();
  @Output() wishChange = new EventEmitter<Wish>();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  isUnavailable(): boolean {
    return (this.wish.donor != null && this.wish.donor.length > 0) || this.wish.invisible;
  }


  deleteClicked() {
    this.wishDeleted.emit(this.wish);
  }

  onCaptionChange(event) {
    this.wish.caption =  event.target.value;
    this.wishChange.emit(this.wish)
  }

  onDescriptionChange(event) {
    this.wish.description =  event.target.value;
    this.wishChange.emit(this.wish)
  }

  onLinkChange(event) {
    this.wish.link =  event.target.value;
    this.wishChange.emit(this.wish)
  }

  toggleVisibility() {
    this.wish.invisible = !this.wish.invisible;
    this.snackBar.open(this.createVisibilityMessage(), null, {duration: 2000});
    this.wishChange.emit(this.wish)
  }

  targetUrl() {
    let url = this.wish.link;
    if (url != null && url.length > 0 && !url.startsWith("http")) {
      url = "http://" + url;
    }
    return url;
  }


  private createVisibilityMessage(): string {
    if (this.wish.invisible) {
      return "Dieser Wunsch wird nicht mehr angezeigt"
    } else {
      return "Dieser Wunsch wird wieder angezeigt"
    }
  }
}
