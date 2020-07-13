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

  async wipeDatabase(): Promise<void> {
    let storeNames = ['p3fes', 'p3p', 'p4', 'p4g', 'p5'];
    await Promise.all(
      storeNames.map((name) => this.dbService.clear(name + '_personae')),
    );
  }

  load(game: string): GameSettings {
    return this.allSettings.find((settings) => settings.name === game);
  }
}
