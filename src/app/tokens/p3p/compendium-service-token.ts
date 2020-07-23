import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p3/p3p-compendium.json';
import { SettingsService } from '../../services/settings.service';
import { P3P_SETTINGS } from './settings-service-token';
import { AppSettingsService } from '../../services/app-settings.service';

function p3pCompendiumFactory(
  settingsService: SettingsService,
  appSettingsService: AppSettingsService,
): CompendiumService {
  return new CompendiumService(compendium, settingsService, appSettingsService);
}

export const P3P_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P3P_COMPENDIUM',
);

export const p3pCompendiumProvider: Provider = {
  provide: P3P_COMPENDIUM,
  useFactory: p3pCompendiumFactory,
  deps: [P3P_SETTINGS, AppSettingsService]
};
