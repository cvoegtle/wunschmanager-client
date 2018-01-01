import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wish } from "../services/wish";

@Component({
  selector: 'wish-edit',
  templateUrl: './wish-edit.component.html',
  styleUrls: ['./wish-edit.component.css']
})
export class WishEditComponent implements OnInit {
  @Input() wish: Wish;
  @Output() wishDeleted = new EventEmitter<number>();
  @Output() wishChange = new EventEmitter<Wish>();

  constructor() { }

  ngOnInit() {
  }

  deleteClicked() {
    this.wishDeleted.emit(this.wish.id);
  }

  onCaptionChange(event) {
    this.wish.caption =  event.target.value;
    this.wishChange.emit(this.wish)
  }

  onDescriptionChange(event) {
    this.wish.description =  event.target.value;
    this.wishChange.emit(this.wish)
  }

  onLinkChange(event) {
    this.wish.link =  event.target.value;
    this.wishChange.emit(this.wish)
  }

}
