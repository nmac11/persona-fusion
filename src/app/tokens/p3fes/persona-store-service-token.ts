import { InjectionToken, Provider } from '@angular/core';
import { PersonaStoreService } from '../../services/persona-store.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

function p3fesPersonaStoreFactory(
  ngxIndexedDB: NgxIndexedDBService,
): PersonaStoreService {
  return new PersonaStoreService('p3fes_personae', ngxIndexedDB);
}

export const P3FES_PERSONA_STORE = new InjectionToken<PersonaStoreService>(
  'P3FES_PERSONA_STORE',
);

export const p3fesPersonaStoreProvider: Provider = {
  provide: P3FES_PERSONA_STORE,
  useFactory: p3fesPersonaStoreFactory,
  deps: [NgxIndexedDBService],
};
