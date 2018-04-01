import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wish } from "../services/wish";
import { makeValidUrl } from "../util/url-helper";

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
    return this.wish.donor == null|| this.wish.donor == this.user;
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
