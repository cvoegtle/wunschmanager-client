import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wish } from "../services/wish";

@Component({
  selector: 'wish-view',
  templateUrl: './wish-view.component.html',
  styleUrls: ['./wish-view.component.css']
})
export class WishViewComponent implements OnInit {
  @Input() wish: Wish;
  @Output() deleted = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  deleteClicked() {
    this.deleted.emit(this.wish.id);
  }

}
