import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wish } from "../services/wish";
import { makeValidUrl } from "../util/url-helper";
import { isBlue, isGreen, isRed, isYellow } from "../util/Color";

@Component({
  selector: 'app-wish-view',
  templateUrl: './wish-view.component.html',
  styleUrls: ['../wish-edit/wish.component.css']
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

  isAvailable(): boolean {
    return this.wish.donor == null || this.wish.donor == this.user;
  }

  isRed() {
    return this.isAvailable() && isRed(this.wish.background);
  }

  isYellow() {
    return this.isAvailable() && isYellow(this.wish.background);
  }

  isGreen() {
    return this.isAvailable() && isGreen(this.wish.background);
  }

  isBlue() {
    return this.isAvailable() && isBlue(this.wish.background);
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
