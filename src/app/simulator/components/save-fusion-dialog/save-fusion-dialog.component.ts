import {
  Component,
  OnInit,
  Inject,
  Injector,
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
import { SkillsValidators } from '../../../validators/skills-validators';
import { SaveNameValidators } from '../../../validators/save-name-validators';
import { PersonaStoreService } from '../../../services/persona-store.service';
import { CompendiumService } from '../../../services/compendium.service';
import { SkillService } from '../../../services/skill.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FusionNodeHelper } from '../../helpers/fusion-node-helper';
import { ActiveGameService } from '../../../services/active-game.service';
import { InheritableSkill } from '../../../models/inheritable-skill';

@Component({
  selector: 'simulator-save-fusion-dialog',
  templateUrl: './save-fusion-dialog.component.html',
  styleUrls: ['./save-fusion-dialog.component.css'],
})
export class SaveFusionDialogComponent implements OnInit {
  saveForm: FormGroup;
  fusionItem: FusionResult;
  personaStoreService: PersonaStoreService;
  fusionNodeHelper: FusionNodeHelper;
  @ViewChild('skills') skillsSelection: MatSelectionList;

  constructor(
    public dialogRef: MatDialogRef<SaveFusionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      fusionItem: FusionResult;
    },
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private activeGameService: ActiveGameService,
    private injector: Injector,
  ) {
    this.fusionItem = data.fusionItem;
    this.fetchServices();
    this.initializeSaveForm();
  }

  ngOnInit(): void {}

  onClose(saveName: string = null): void {
    this.dialogRef.close(saveName);
  }

  updateSelections(e: Event): void {
    this.saveForm.patchValue({ skills: this.skillsSelection._value });
  }

  inheritableSkills(): InheritableSkill[] {
    return this.fusionItem.inheritableSkills.filter((s) => s.probRatio > 0);
  }

  private fetchServices(): void {
    const tokens = this.activeGameService.getTokenSet();
    this.personaStoreService = this.injector.get<PersonaStoreService>(
      tokens.personaStore,
    );
    const compendiumService = this.injector.get<CompendiumService>(
      tokens.compendium,
    );
    const skillService = this.injector.get<SkillService>(tokens.skill);
    this.fusionNodeHelper = new FusionNodeHelper(
      compendiumService,
      skillService,
    );
  }

  private initializeSaveForm(): void {
    this.saveForm = this.fb.group({
      saveName: [
        '',
        {
          validators: [Validators.required, SaveNameValidators.empty],
          asyncValidators: [
            SaveNameValidators.availability(this.personaStoreService),
          ],
        },
      ],
      skills: [
        [],
        SkillsValidators.count(this.fusionItem.skillsInheritedCount),
      ],
    });
  }

  async onSave(): Promise<void> {
    if (!this.saveForm.valid) return;
    const fusionNode = this.createFusionNode();
    const saveId = await this.personaStoreService.save(fusionNode);
    const success = typeof saveId === 'number';
    this.showSaveStatus(fusionNode.saveName, success);
    if (success) this.onClose(fusionNode.saveName);
  }

  private createFusionNode(): FusionNode {
    const formValue = this.saveForm.value;
    const fusionNode = this.fusionNodeHelper.convertFusionResult(
      this.fusionItem,
      formValue.skills,
    );
    fusionNode.saveName = formValue.saveName.replace(/\s+/g, ' ').trim();
    return fusionNode;
  }

  private showSaveStatus(saveName: string, success = true): void {
    const message = success
      ? `SUCCESS: Saved '${saveName}'.`
      : `ERROR: Failed to save '${saveName}'.`;
    this.snackBar.open(message, 'CLOSE', { duration: 1000 });
  }
}
