import { Component, Inject, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleService } from '../services/title.service';
import { GameConfig } from '../models/game-config';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';

@Component({
  selector: 'settings-root',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settings: { [key: string]: boolean };
  settingsForm: FormGroup;
  settingsTemplate: any;

  constructor(
    @Inject(GAME_CONFIG) private config: GameConfig,
    private settingsService: SettingsService,
    private snackBar: MatSnackBar,
    private titleService: TitleService,
  ) {
    this.settingsTemplate = this.config.settingsTemplate;
    this.loadSettings();
    this.titleService.setTitle('Settings', this.config.fullTitle);
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

  noSettings(): boolean {
    return Object.keys(this.settings).length === 0;
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
