import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.css']
})
export class EditEventDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditEventDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  isEmptyEvent() {
    return this.data.event == null || this.data.event.length == 0;
  }
  cancelClicked() {
    this.dialogRef.close();
  }

}
