
import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './app-confirm.component.html',
  styleUrls: ['./app-confirm.component.scss']
})
export class AppComfirmComponent {
  constructor(public dialogRef: MatDialogRef<AppComfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onConfirm(): void { 
    this.dialogRef.close(true);
  }
  
  onDismiss(): void { 
    this.dialogRef.close(false);
  }
}
export class ConfirmDialogModel { 
  constructor(public title: string, public message: string) { }
}


