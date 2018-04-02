import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isAvailable, Wish } from "../services/wish";
import { makeValidUrl } from "../util/url-helper";
import { isBlue, isGreen, isRed, isYellow } from "../util/color";

@Component({
  selector: 'app-wish-view',
  templateUrl: './wish-view.component.html',
  styleUrls: ['../wish-edit/wish.component.css', '../util/color.css']
})
export class WishViewComponent implements OnInit {
  @Input() wish: Wish;
  @Input() user: string;
  @Input() restricted: boolean = false;
  @Output() reserved = new EventEmitter<Wish>();

  constructor() {
  }

  ngOnInit() {
  }

  isAvailable() {
    return isAvailable(this.wish);
  }

  isRed() {
    return isAvailable(this.wish) && isRed(this.wish.background);
  }

  isYellow() {
    return isAvailable(this.wish) && isYellow(this.wish.background);
  }

  isGreen() {
    return isAvailable(this.wish) && isGreen(this.wish.background);
  }

  isBlue() {
    return isAvailable(this.wish) && isBlue(this.wish.background);
  }


  isMyPresent(): boolean {
    return this.wish.donor == this.user;
  }

  getTooltip() {
    if (this.isMyPresent()) {
      return 'Geschenk wieder freigeben';
    } else {
      return 'Ich möchte das schenken';
    }
  }

  reserveClicked() {
    this.reserved.emit(this.wish);
  }

  targetUrl() {
    return makeValidUrl(this.wish.link);
  }

}
