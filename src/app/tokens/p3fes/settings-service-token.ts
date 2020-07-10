import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { SettingsPreloaderService } from '../../services/settings-preloader.service';
import defaults from '../../data/p3/p3-default-settings.json';
import template from '../../data/p3/p3fes-settings-template.json';

function p3fesSettingsFactory(
  settingsPreloaderService: SettingsPreloaderService,
): SettingsService {
  return new SettingsService(
    'p3fes_settings',
    defaults,
    template,
    settingsPreloaderService,
  );
}

export const P3FES_SETTINGS = new InjectionToken<SettingsService>(
  'P3FES_SETTINGS',
);

export const p3fesSettingsProvider: Provider = {
  provide: P3FES_SETTINGS,
  useFactory: p3fesSettingsFactory,
  deps: [SettingsPreloaderService],
};
