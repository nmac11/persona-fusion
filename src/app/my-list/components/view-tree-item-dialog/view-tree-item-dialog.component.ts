import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FusionNode } from '../../../models/fusion-node';

@Component({
  selector: 'my-list-view-tree-item-dialog',
  templateUrl: './view-tree-item-dialog.component.html',
  styleUrls: ['./view-tree-item-dialog.component.css'],
})
export class ViewTreeItemDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewTreeItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public fusionItem: FusionNode,
  ) {}

  ngOnInit(): void {}
}
