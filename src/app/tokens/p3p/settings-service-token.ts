import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { SettingsPreloaderService } from '../../services/settings-preloader.service';
import defaults from '../../data/p3/p3-default-settings.json';
import template from '../../data/p3/p3p-settings-template.json';

function p3pSettingsFactory(
  settingsPreloaderService: SettingsPreloaderService,
): SettingsService {
  return new SettingsService(
    'p3p_settings',
    defaults,
    template,
    settingsPreloaderService,
  );
}

export const P3P_SETTINGS = new InjectionToken<SettingsService>(
  'P3P_SETTINGS',
);

export const p3pSettingsProvider: Provider = {
  provide: P3P_SETTINGS,
  useFactory: p3pSettingsFactory,
  deps: [SettingsPreloaderService],
};
