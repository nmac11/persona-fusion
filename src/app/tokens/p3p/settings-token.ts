import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

function p3pSettingsFactory(): SettingsService {
  return new SettingsService('p3p');
}

export const P3P_SETTINGS = new InjectionToken<SettingsService>(
  'P3P_SETTINGS',
);

export const p3pSettingsProvider: Provider = {
  provide: P3P_SETTINGS,
  useFactory: p3pSettingsFactory,
};
