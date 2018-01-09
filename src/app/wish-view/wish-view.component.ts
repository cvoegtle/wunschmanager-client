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

  targetUrl() {
    let url = this.wish.link;
    if (url != null && url.length > 0 && !url.startsWith("http")) {
      url = "http://" + url;
    }
    return url;
  }

}
