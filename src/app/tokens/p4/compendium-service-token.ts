import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p4/p4-compendium.json';
import { SettingsService } from '../../services/settings.service';
import { P4_SETTINGS } from './settings-service-token';
import { AppSettingsService } from '../../services/app-settings.service';

function p4CompendiumFactory(
  settingsService: SettingsService,
  appSettingsService: AppSettingsService,
): CompendiumService {
  return new CompendiumService(compendium, settingsService, appSettingsService);
}

export const P4_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P4_COMPENDIUM',
);

export const p4CompendiumProvider: Provider = {
  provide: P4_COMPENDIUM,
  useFactory: p4CompendiumFactory,
  deps: [P4_SETTINGS, AppSettingsService]
};
