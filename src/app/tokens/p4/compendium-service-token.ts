import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p4/p4-compendium.json';

function p4CompendiumFactory(): CompendiumService {
  return new CompendiumService(compendium);
}

export const P4_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P4_COMPENDIUM',
);

export const p4CompendiumProvider: Provider = {
  provide: P4_COMPENDIUM,
  useFactory: p4CompendiumFactory,
};
