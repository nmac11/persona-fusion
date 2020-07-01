import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FusionResult } from '../../../models/fusion-result';
import { FusionNode } from '../../../models/fusion-node';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { SkillsValidators } from '../../validators/skills-validators';
import { SaveNameValidators } from '../../validators/save-name-validators';
import { PersonaStoreService } from '../../../services/persona-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FusionNodeHelper } from '../../helpers/fusion-node-helper';

@Component({
  selector: 'simulator-save-fusion-dialog',
  templateUrl: './save-fusion-dialog.component.html',
  styleUrls: ['./save-fusion-dialog.component.css'],
})
export class SaveFusionDialogComponent implements OnInit {
  saveForm: FormGroup;
  fusionItem: FusionResult;
  personaStoreService: PersonaStoreService;
  @ViewChild('skills') skillsSelection: MatSelectionList;

  constructor(
    public dialogRef: MatDialogRef<SaveFusionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      fusionItem: FusionResult;
      personaStore: PersonaStoreService;
      fusionNodeHelper: FusionNodeHelper;
    },
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.fusionItem = data.fusionItem;
    this.personaStoreService = data.personaStore;
    this.saveForm = this.fb.group({
      saveName: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [SaveNameValidators.availability(data.personaStore)],
        },
      ],
      skills: [
        [],
        SkillsValidators.count(this.fusionItem.skillsInheritedCount),
      ],
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  updateSelections(e: Event): void {
    this.saveForm.patchValue({ skills: this.skillsSelection._value });
  }

  async onSave(): Promise<void> {
    if (!this.saveForm.valid) return;
    const fusionNode = this.createFusionNode();
    const success = await this.personaStoreService.save(fusionNode);
    this.showSaveStatus(fusionNode.saveName, success);
    if (success) this.onCancel();
  }

  private createFusionNode(): FusionNode {
    const formValue = this.saveForm.value;
    const fusionNode = this.data.fusionNodeHelper.convertFusionResult(
      this.fusionItem,
      formValue.skills,
    );
    fusionNode.saveName = formValue.saveName;
    return fusionNode;
  }

  private showSaveStatus(saveName: string, success = true): void {
    const message = success
      ? `SUCCESS: Saved '${saveName}'.`
      : `ERROR: Failed to save '${saveName}'.`;
    this.snackBar.open(message, 'CLOSE', { duration: 1000 });
  }
}
