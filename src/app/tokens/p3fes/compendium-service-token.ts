import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p3/p3fes-compendium.json';
import { SettingsService } from '../../services/settings.service';
import { P3FES_SETTINGS } from './settings-service-token';
import { AppSettingsService } from '../../services/app-settings.service';

function p3fesCompendiumFactory(
  settingsService: SettingsService,
  appSettingsService: AppSettingsService,
): CompendiumService {
  return new CompendiumService(compendium, settingsService, appSettingsService);
}

export const P3FES_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P3FES_COMPENDIUM',
);

export const p3fesCompendiumProvider: Provider = {
  provide: P3FES_COMPENDIUM,
  useFactory: p3fesCompendiumFactory,
  deps: [P3FES_SETTINGS, AppSettingsService],
};
