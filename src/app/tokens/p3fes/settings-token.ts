import { InjectionToken, Provider } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

function p3fesSettingsFactory(): SettingsService {
  return new SettingsService('p3fes');
}

export const P3FES_SETTINGS = new InjectionToken<SettingsService>(
  'P3FES_SETTINGS',
);

export const p3fesSettingsProvider: Provider = {
  provide: P3FES_SETTINGS,
  useFactory: p3fesSettingsFactory,
};
