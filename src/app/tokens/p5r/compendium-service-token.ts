import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p5/p5r-compendium.json';
import { SettingsService } from '../../services/settings.service';
import { P5R_SETTINGS } from './settings-service-token';
import { AppSettingsService } from '../../services/app-settings.service';

function p5rCompendiumFactory(
  settingsService: SettingsService,
  appSettingsService: AppSettingsService,
): CompendiumService {
  return new CompendiumService(compendium, settingsService, appSettingsService);
}

export const P5R_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P5R_COMPENDIUM',
);

export const p5rCompendiumProvider: Provider = {
  provide: P5R_COMPENDIUM,
  useFactory: p5rCompendiumFactory,
  deps: [P5R_SETTINGS, AppSettingsService]
};
