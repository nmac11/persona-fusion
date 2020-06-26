import { InjectionToken, Provider } from '@angular/core';
import { PersonaStoreService } from '../../services/persona-store.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

function p4PersonaStoreFactory(
  ngxIndexedDB: NgxIndexedDBService,
): PersonaStoreService {
  return new PersonaStoreService('p4', ngxIndexedDB);
}

export const P4_PERSONA_STORE = new InjectionToken<PersonaStoreService>(
  'P4_PERSONA_STORE',
);

export const p4PersonaStoreProvider: Provider = {
  provide: P4_PERSONA_STORE,
  useFactory: p4PersonaStoreFactory,
  deps: [NgxIndexedDBService],
};
