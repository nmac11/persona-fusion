import { Component, OnInit, Injector } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FusionNode } from '../../../models/fusion-node';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaveNameValidators } from '../../../validators/save-name-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonaStoreService } from '../../../services/persona-store.service';
import { ActiveGameService } from '../../../services/active-game.service';

@Component({
  selector: 'my-list-create',
  templateUrl: './create-persona.component.html',
  styleUrls: ['./create-persona.component.css'],
})
export class CreatePersonaComponent implements OnInit {
  personaStoreService: PersonaStoreService;
  selectedItem: FusionNode;
  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreatePersonaComponent>,
    private fb: FormBuilder,
    private injector: Injector,
    private activeGameService: ActiveGameService,
    private snackBar: MatSnackBar,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.personaStoreService = this.injector.get<PersonaStoreService>(
      tokens.personaStore,
    );
    this.createForm = this.fb.group({
      saveName: [
        '',
        {
          validators: [Validators.required, SaveNameValidators.empty],
          asyncValidators: SaveNameValidators.availability(
            this.personaStoreService,
          ),
        },
      ],
      fusionNode: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  selectionChange(fusionNode: FusionNode): void {
    this.selectedItem = fusionNode;
    this.createForm.patchValue({ fusionNode: fusionNode });
  }

  async onSubmit(): Promise<void> {
    if (!this.createForm.valid) return;
    const formValue = this.createForm.value;
    const { saveName, fusionNode } = formValue;
    const saveId = await this.personaStoreService.save({
      ...fusionNode,
      saveName: saveName.trim(),
    });
    const success = typeof saveId === 'number';
    this.openSnackBar(success);
    if (success) this.dialogRef.close(saveId);
  }

  private openSnackBar(success: boolean): void {
    const message = success
      ? `SUCCESS: Created '${this.createForm.value.saveName}'.`
      : `ERROR: Failed to create '${this.createForm.get('saveName')}'.`;
    this.snackBar.open(message, 'CLOSE', { duration: 1000 });
  }
}
