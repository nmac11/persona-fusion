import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { SettingsPreloaderService } from '../../services/settings-preloader.service';
import defaults from '../../data/p5/p5r-default-settings.json';
import template from '../../data/p5/p5r-settings-template.json';

function p5rSettingsFactory(
  settingsPreloaderService: SettingsPreloaderService,
): SettingsService {
  return new SettingsService(
    'p5r_settings',
    defaults,
    template,
    settingsPreloaderService,
  );
}

export const P5R_SETTINGS = new InjectionToken<SettingsService>(
  'P5R_SETTINGS',
);

export const p5rSettingsProvider: Provider = {
  provide: P5R_SETTINGS,
  useFactory: p5rSettingsFactory,
  deps: [SettingsPreloaderService],
};
