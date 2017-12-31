import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  copyClicked(url_field: HTMLInputElement) {
    url_field.select();
    document.execCommand('copy');
  }
}
