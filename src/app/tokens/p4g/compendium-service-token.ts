import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p4/p4g-compendium.json';
import { SettingsService } from '../../services/settings.service';
import { P4G_SETTINGS } from './settings-service-token';

function p4gCompendiumFactory(
  settingsService: SettingsService,
): CompendiumService {
  return new CompendiumService(compendium, settingsService);
}

export const P4G_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P4G_COMPENDIUM',
);

export const p4gCompendiumProvider: Provider = {
  provide: P4G_COMPENDIUM,
  useFactory: p4gCompendiumFactory,
  deps: [P4G_SETTINGS]
};
