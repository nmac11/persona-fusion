import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

function p4gSettingsFactory(): SettingsService {
  return new SettingsService('p4g');
}

export const P4G_SETTINGS = new InjectionToken<SettingsService>(
  'P4G_SETTINGS',
);

export const p4gSettingsProvider: Provider = {
  provide: P4G_SETTINGS,
  useFactory: p4gSettingsFactory,
};
