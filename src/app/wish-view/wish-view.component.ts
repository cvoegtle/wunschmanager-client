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
  @Output() change = new EventEmitter<Wish>();

  constructor() { }

  ngOnInit() {
  }

  deleteClicked() {
    this.deleted.emit(this.wish.id);
  }

  onCaptionChange(event) {
    this.wish.caption =  event.target.value;
    this.change.emit(this.wish)
  }

  onDescriptionChange(event) {
    this.wish.description =  event.target.value;
    this.change.emit(this.wish)
  }

  onLinkChange(event) {
    this.wish.link =  event.target.value;
    this.change.emit(this.wish)
  }

}
