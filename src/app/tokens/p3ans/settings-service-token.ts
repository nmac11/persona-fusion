import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { SettingsPreloaderService } from '../../services/settings-preloader.service';

function p3ansSettingsFactory(
  settingsPreloaderService: SettingsPreloaderService,
): SettingsService {
  return new SettingsService(
    'p3ans_settings',
    {},
    {},
    settingsPreloaderService,
  );
}

export const P3ANS_SETTINGS = new InjectionToken<SettingsService>(
  'P3ANS_SETTINGS',
);

export const p3ansSettingsProvider: Provider = {
  provide: P3ANS_SETTINGS,
  useFactory: p3ansSettingsFactory,
  deps: [SettingsPreloaderService],
};
