import { Injectable } from '@angular/core';
import { GameSettings } from '../models/game-settings';
import { SettingsPreloaderService } from './settings-preloader.service';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  settings: GameSettings;

  constructor(private settingsPreloaderService: SettingsPreloaderService) {
    this.settings = this.settingsPreloaderService.load('app_settings');
    if (!this.settings) {
      this.settings = {
        name: 'app_settings',
        values: { PROBABILITY: true, EXPANDDETAILS: true, HIDEBLOCKED: true },
      };
      this.saveAndReloadDefaults();
    }
  }

  private async saveAndReloadDefaults(): Promise<void> {
    await this.settingsPreloaderService.save(this.settings);
    this.settings = this.settingsPreloaderService.load('app_settings');
  }

  getValues(): { [key: string]: boolean } {
    return this.settings.values;
  }

  async save(values: any): Promise<void> {
    try {
      this.settings = Object.assign(this.settings, { values });
      await this.settingsPreloaderService.save(this.settings);
    } catch (e) {
      throw 'Save failed!';
    }
  }

  async wipe(): Promise<void> {
    try {
      await this.settingsPreloaderService.wipeDatabase();
    } catch (e) {
      throw 'Couldn\'t clear database!';
    }
  }
}
