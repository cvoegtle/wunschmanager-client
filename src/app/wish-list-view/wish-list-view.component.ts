import { Component, Input, OnInit } from '@angular/core';
import { WishList } from "../services/wish-list";

@Component({
  selector: 'app-wish-list-view',
  templateUrl: './wish-list-view.component.html',
  styleUrls: ['./wish-list-view.component.css']
})
export class WishListViewComponent implements OnInit {
  @Input() wishList: WishList;

  constructor() { }

  ngOnInit() {
  }

}
