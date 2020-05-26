import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../p3p/services/compendium.service';
import compendium from '../../data/p3/p3fes-compendium.json';

function p3fesCompendiumFactory(): CompendiumService {
  return new CompendiumService(compendium);
}

export const P3FES_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P3FES_COMPENDIUM',
);

export const p3fesCompendiumProvider: Provider = {
  provide: P3FES_COMPENDIUM,
  useFactory: p3fesCompendiumFactory,
};
