import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-clear-database-dialog',
  templateUrl: './confirm-clear-database-dialog.component.html',
  styleUrls: ['./confirm-clear-database-dialog.component.css'],
})
export class ConfirmClearDatabaseDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmClearDatabaseDialogComponent>) {}

  ngOnInit(): void {}
}
