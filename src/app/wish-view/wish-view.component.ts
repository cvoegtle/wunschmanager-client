import { Component, Input, OnInit } from '@angular/core';
import { Wish } from "../services/wish";

@Component({
  selector: 'wish-view',
  templateUrl: './wish-view.component.html',
  styleUrls: ['./wish-view.component.css']
})
export class WishViewComponent implements OnInit {
  @Input() wish: Wish;

  constructor() { }

  ngOnInit() {
  }

}
