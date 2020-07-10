import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { SettingsPreloaderService } from '../../services/settings-preloader.service';
import defaults from '../../data/p4/p4g-default-settings.json';
import template from '../../data/p4/p4g-settings-template.json';

function p4gSettingsFactory(
  settingsPreloaderService: SettingsPreloaderService,
): SettingsService {
  return new SettingsService(
    'p4g_settings',
    defaults,
    template,
    settingsPreloaderService,
  );
}

export const P4G_SETTINGS = new InjectionToken<SettingsService>(
  'P4G_SETTINGS',
);

export const p4gSettingsProvider: Provider = {
  provide: P4G_SETTINGS,
  useFactory: p4gSettingsFactory,
  deps: [SettingsPreloaderService],
};
