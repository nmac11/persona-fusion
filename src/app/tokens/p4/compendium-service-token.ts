import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p4/p4-compendium.json';
import { SettingsService } from '../../services/settings.service';
import { P4_SETTINGS } from './settings-service-token';

function p4CompendiumFactory(
  settingsService: SettingsService,
): CompendiumService {
  return new CompendiumService(compendium, settingsService);
}

export const P4_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P4_COMPENDIUM',
);

export const p4CompendiumProvider: Provider = {
  provide: P4_COMPENDIUM,
  useFactory: p4CompendiumFactory,
  deps: [P4_SETTINGS]
};
