import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p3/p3fes-compendium.json';
import arcana from '../../data/p3/p3-arcana.json';

function p3fesCompendiumFactory(): CompendiumService {
  return new CompendiumService(compendium, arcana);
}

export const P3FES_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P3FES_COMPENDIUM',
);

export const p3fesCompendiumProvider: Provider = {
  provide: P3FES_COMPENDIUM,
  useFactory: p3fesCompendiumFactory,
};
