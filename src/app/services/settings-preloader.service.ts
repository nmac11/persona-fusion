import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { GameSettings } from '../models/game-settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsPreloaderService {
  private allSettings: GameSettings[];

  constructor(private dbService: NgxIndexedDBService) {}

  async fetchAll(): Promise<void> {
    this.allSettings = await this.dbService.getAll('settings');
  }

  async save(settings: GameSettings) {
    const status = await this.dbService.update('settings', settings);
    await this.fetchAll();
    return status;
  }

  load(game: string): GameSettings {
    return this.allSettings.find((settings) => settings.name === game);
  }
}
