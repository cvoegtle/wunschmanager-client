import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Wish } from "../services/wish";

@Component({
  selector: 'app-wish-view',
  templateUrl: './wish-view.component.html',
  styleUrls: ['./wish-view.component.css']
})
export class WishViewComponent implements OnInit {
  @Input() wish: Wish;
  @Input() user: string;
  @Input() restricted: boolean = false;
  @Output() reserved = new EventEmitter<Wish>();

  constructor() { }

  ngOnInit() {
  }

  isAvailable(): boolean {
    return this.wish.donor == null || this.wish.donor.length == 0 || this.wish.donor == this.user;
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
    let url = this.wish.link;
    if (url != null && url.length > 0 && !url.startsWith("http")) {
      url = "http://" + url;
    }
    return url;
  }

}
