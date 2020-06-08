import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import compendium from '../../data/p4/p4g-compendium.json';

function p4gCompendiumFactory(): CompendiumService {
  return new CompendiumService(compendium);
}

export const P4G_COMPENDIUM = new InjectionToken<CompendiumService>(
  'P4G_COMPENDIUM',
);

export const p4gCompendiumProvider: Provider = {
  provide: P4G_COMPENDIUM,
  useFactory: p4gCompendiumFactory,
};
