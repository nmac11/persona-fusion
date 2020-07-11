import { Component, OnInit, Injector } from '@angular/core';
import { ActiveGameService } from '../services/active-game.service';
import { SettingsService } from '../services/settings.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'settings-root',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settings: { [key: string]: boolean };
  settingsService: SettingsService;
  settingsForm: FormGroup;
  settingsTemplate: any;

  constructor(
    private injector: Injector,
    private activeGameService: ActiveGameService,
    private snackBar: MatSnackBar,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.settingsService = this.injector.get<SettingsService>(tokens.settings);
    this.settingsTemplate = this.settingsService.template;
    this.loadSettings();
  }

  ngOnInit(): void {}

  loadSettings(): void {
    this.settings = this.settingsService.getValues();
    const settingsFormControls = Object.keys(this.settings).reduce(
      (res, key) => {
        res[key] = new FormControl(this.settings[key]);
        return res;
      },
      {},
    );
    this.settingsForm = new FormGroup(settingsFormControls);
  }

  async saveSettings(): Promise<void> {
    try {
      await this.settingsService.save(this.settingsForm.value);
      this.settingsForm.markAsPristine();
      this.openSnackbar('SUCCESS: Settings have been updated.');
    } catch (e) {
      this.openSnackbar(`ERROR: ${e}`);
    }
  }

  private openSnackbar(message: string): void {
    this.snackBar.open(message, 'CLOSE', { duration: 1000 });
  }
}
