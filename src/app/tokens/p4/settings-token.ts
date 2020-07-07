import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

function p4SettingsFactory(): SettingsService {
  return new SettingsService('p4');
}

export const P4_SETTINGS = new InjectionToken<SettingsService>(
  'P4_SETTINGS',
);

export const p4SettingsProvider: Provider = {
  provide: P4_SETTINGS,
  useFactory: p4SettingsFactory,
};
