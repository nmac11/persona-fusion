import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FusionNode } from '../../models/fusion-node';

@Component({
  selector: 'shared-skills-dialog',
  templateUrl: './skills-dialog.component.html',
  styleUrls: ['./skills-dialog.component.css'],
})
export class SkillsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SkillsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { fusionItem: FusionNode },
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
