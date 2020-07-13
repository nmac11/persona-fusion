import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { SettingsPreloaderService } from '../../services/settings-preloader.service';
import defaults from '../../data/p5/p5-default-settings.json';
import template from '../../data/p5/p5-settings-template.json';

function p5SettingsFactory(
  settingsPreloaderService: SettingsPreloaderService,
): SettingsService {
  return new SettingsService(
    'p5_settings',
    defaults,
    template,
    settingsPreloaderService,
  );
}

export const P5_SETTINGS = new InjectionToken<SettingsService>(
  'P5_SETTINGS',
);

export const p5SettingsProvider: Provider = {
  provide: P5_SETTINGS,
  useFactory: p5SettingsFactory,
  deps: [SettingsPreloaderService],
};
