import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Persona } from '../../models/persona';
import { FusionNode } from '../../models/fusion-node';
import { CompendiumService } from '../../services/compendium.service';
import { PersonaStoreService } from '../../services/persona-store.service';
import { FusionNodeHelper } from '../../simulator/helpers/fusion-node-helper';

@Component({
  selector: 'shared-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css'],
})
export class ListDialogComponent {
  selectedItem: FusionNode;

  constructor(public dialogRef: MatDialogRef<ListDialogComponent>) {}

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
