import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../../models/persona';
import { FusionNode } from '../../../models/fusion-node';
import { CompendiumService } from '../../../services/compendium.service';
import { FusionNodeHelper } from '../../helpers/fusion-node-helper';

@Component({
  selector: 'simulator-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css'],
})
export class ListDialogComponent {
  selectedItem: FusionNode;

  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      compendium: CompendiumService;
      fusionNodeHelper: FusionNodeHelper;
    },
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  selectionChange(fusionItem: FusionNode): void {
    this.selectedItem = fusionItem;
  }

  submitSelection(fusionItem: FusionNode): void {
    this.dialogRef.close(fusionItem);
  }
}
