import { Inject, Injectable } from '@angular/core';
import { SettingsPreloaderService } from './settings-preloader.service';
import { GameSettings } from '../models/game-settings';
import { Persona } from '../models/persona';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';
import { GameConfig } from '../models/game-config';

@Injectable()
export class SettingsService {
  private settings: GameSettings;
  private storeName: string;
  private defaults: { [key: string]: boolean };

  constructor(
    @Inject(GAME_CONFIG) private config: GameConfig,
    private settingsPreloaderService: SettingsPreloaderService,
  ) {
    this.storeName = config.title + '_settings';
    this.defaults = config.defaultSettings;
    this.init();
  }

  private init(): void {
    this.settings = this.settingsPreloaderService.load(this.storeName);
    if (!this.settings) {
      this.settings = { name: this.storeName, values: this.defaults };
      this.saveAndReloadDefaults();
    }
  }

  private async saveAndReloadDefaults(): Promise<void> {
    await this.settingsPreloaderService.save(this.settings);
    this.settings = this.settingsPreloaderService.load(this.storeName);
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

  testPersona(p: Persona): boolean {
    return !p.preReqs || p.preReqs.every((preReq) => this.getValues()[preReq]);
  }
}
