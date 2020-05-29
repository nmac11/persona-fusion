import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p3/p3p-compendium.json';
import arcana from '../../data/p3/p3-arcana.json';
import specialFusions from '../../data/p3/p3-special-fusions.json';

function p3pCompendiumFactory(): CompendiumService {
  return new CompendiumService(compendium, arcana, specialFusions);
}

export const P3P_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P3P_COMPENDIUM',
);

export const p3pCompendiumProvider: Provider = {
  provide: P3P_COMPENDIUM,
  useFactory: p3pCompendiumFactory,
};
