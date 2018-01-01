import { Component, OnInit, Input } from '@angular/core';
import { Wish } from "../services/wish";

@Component({
  selector: 'app-wish-view',
  templateUrl: './wish-view.component.html',
  styleUrls: ['./wish-view.component.css']
})
export class WishViewComponent implements OnInit {
  @Input() wish: Wish;

  constructor() { }

  ngOnInit() {
  }

  openClicked() {
    let url = this.wish.link;
    if (!url.startsWith("http")) {
      url = "http://" + url;
    }
    window.open(url);
  }

}
