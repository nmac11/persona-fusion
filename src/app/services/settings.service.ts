import { Inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { SettingsPreloaderService } from './settings-preloader.service';
import { GameSettings } from '../models/game-settings';
import { Persona } from '../models/persona';

@Injectable()
export class SettingsService {
  private settings: GameSettings;

  constructor(
    @Inject(String) private storeName: string,
    @Inject(Object) private defaults: { [key: string]: boolean },
    @Inject(Object) public template: any,
    private settingsPreloaderService: SettingsPreloaderService,
  ) {
    this.init();
  }

  private init(): void {
    this.settings = this.settingsPreloaderService.load(this.storeName);
    if (!this.settings) {
      this.settings = { name: this.storeName, values: this.defaults };
      this.settingsPreloaderService.save(this.settings);
    }
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
