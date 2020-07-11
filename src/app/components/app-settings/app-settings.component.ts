import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from '../../services/app-settings.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GameSettings } from '../../models/game-settings';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css'],
})
export class AppSettingsComponent implements OnInit {
  settings: { [key: string]: boolean };
  appSettingsForm: FormGroup;

  constructor(
    private appSettingsService: AppSettingsService,
    private snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    this.settings = this.appSettingsService.getValues();
    const settingsFormControls = Object.keys(this.settings).reduce(
      (res, key) => {
        res[key] = new FormControl(this.settings[key]);
        return res;
      },
      {},
    );
    this.appSettingsForm = new FormGroup(settingsFormControls);
    console.log(this.appSettingsForm.value);
  }

  async saveSettings(): Promise<void> {
    try {
      await this.appSettingsService.save(this.appSettingsForm.value);
      this.appSettingsForm.markAsPristine();
      this.openSnackbar('SUCCESS: Settings have been updated.');
    } catch (e) {
      this.openSnackbar(`ERROR: ${e}`);
    }
  }

  private openSnackbar(message: string): void {
    this.snackBar.open(message, 'CLOSE', { duration: 1000 });
  }
}
