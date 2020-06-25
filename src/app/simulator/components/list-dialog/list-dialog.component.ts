import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../../models/persona';
import { CompendiumService } from '../../../services/compendium.service';

@Component({
  selector: 'simulator-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css'],
})
export class ListDialogComponent {
  selectedPersona: Persona;

  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { compendium: CompendiumService; persona?: Persona },
  ) {
    this.selectedPersona = data.persona;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  selectionChange(persona: Persona): void {
    this.selectedPersona = persona;
  }

  submitSelection(persona: Persona): void {
    this.dialogRef.close(persona);
  }
}
