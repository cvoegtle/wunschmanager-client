import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-delete-wish-list-dialog',
  templateUrl: './delete-wish-list-dialog.component.html',
  styleUrls: ['./delete-wish-list-dialog.component.css']
})
export class DeleteWishListDialogComponent {

  constructor(
      public dialogRef: MatDialogRef<DeleteWishListDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
