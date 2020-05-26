import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../services/compendium.service';
import compendium from '../../data/p3/p3p-compendium.json';

function p3pCompendiumFactory(): CompendiumService {
  return new CompendiumService(compendium);
}

export const P3P_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P3P_COMPENDIUM',
);

export const p3pCompendiumProvider: Provider = {
  provide: P3P_COMPENDIUM,
  useFactory: p3pCompendiumFactory,
};
