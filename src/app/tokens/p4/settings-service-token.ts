import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { SettingsPreloaderService } from '../../services/settings-preloader.service';
import defaults from '../../data/p4/p4-default-settings.json';
import template from '../../data/p4/p4-settings-template.json';

function p4SettingsFactory(
  settingsPreloaderService: SettingsPreloaderService,
): SettingsService {
  return new SettingsService(
    'p4_settings',
    defaults,
    template,
    settingsPreloaderService,
  );
}

export const P4_SETTINGS = new InjectionToken<SettingsService>(
  'P4_SETTINGS',
);

export const p4SettingsProvider: Provider = {
  provide: P4_SETTINGS,
  useFactory: p4SettingsFactory,
  deps: [SettingsPreloaderService],
};
