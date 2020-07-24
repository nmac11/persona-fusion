import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p3/p3ans-compendium.json';
import { SettingsService } from '../../services/settings.service';
import { P3ANS_SETTINGS } from './settings-service-token';
import { AppSettingsService } from '../../services/app-settings.service';

function p3ansCompendiumFactory(
  settingsService: SettingsService,
  appSettingsService: AppSettingsService,
): CompendiumService {
  return new CompendiumService(compendium, settingsService, appSettingsService);
}

export const P3ANS_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P3ANS_COMPENDIUM',
);

export const p3ansCompendiumProvider: Provider = {
  provide: P3ANS_COMPENDIUM,
  useFactory: p3ansCompendiumFactory,
  deps: [P3ANS_SETTINGS, AppSettingsService],
};
