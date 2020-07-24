import { InjectionToken, Provider } from '@angular/core';
import { PersonaStoreService } from '../../services/persona-store.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

function p5rPersonaStoreFactory(
  ngxIndexedDB: NgxIndexedDBService,
): PersonaStoreService {
  return new PersonaStoreService('p5r_personae', ngxIndexedDB);
}

export const P5R_PERSONA_STORE = new InjectionToken<PersonaStoreService>(
  'P5R_PERSONA_STORE',
);

export const p5rPersonaStoreProvider: Provider = {
  provide: P5R_PERSONA_STORE,
  useFactory: p5rPersonaStoreFactory,
  deps: [NgxIndexedDBService],
};
