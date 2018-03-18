import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Wish } from "../services/wish";

@Component({
  selector: 'app-wish-properties',
  templateUrl: './wish-properties.component.html',
  styleUrls: ['./wish-properties.component.css']
})
export class WishPropertiesComponent {
  wish: Wish;
  changed: boolean;

  constructor(public dialogRef: MatDialogRef<WishPropertiesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.wish = data.wish;
    this.dialogRef.backdropClick().subscribe(result => dialogRef.close(this.changed));
    this.dialogRef.keydownEvents().subscribe(key => {
      if (key.code == "Escape") dialogRef.close(this.changed);
    });
  }

  toggleVisibility() {
    this.wish.invisible = !this.wish.invisible;
    this.changed = true;
  }

}