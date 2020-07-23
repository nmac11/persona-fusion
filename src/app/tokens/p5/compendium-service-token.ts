import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p5/p5-compendium.json';
import { SettingsService } from '../../services/settings.service';
import { P5_SETTINGS } from './settings-service-token';
import { AppSettingsService } from '../../services/app-settings.service';

function p5CompendiumFactory(
  settingsService: SettingsService,
  appSettingsService: AppSettingsService,
): CompendiumService {
  return new CompendiumService(compendium, settingsService, appSettingsService);
}

export const P5_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P5_COMPENDIUM',
);

export const p5CompendiumProvider: Provider = {
  provide: P5_COMPENDIUM,
  useFactory: p5CompendiumFactory,
  deps: [P5_SETTINGS, AppSettingsService]
};
