import { InjectionToken, Provider } from '@angular/core';
import { PersonaStoreService } from '../../services/persona-store.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

function p3pPersonaStoreFactory(
  ngxIndexedDB: NgxIndexedDBService,
): PersonaStoreService {
  return new PersonaStoreService('p3p_personae', ngxIndexedDB);
}

export const P3P_PERSONA_STORE = new InjectionToken<PersonaStoreService>(
  'P3P_PERSONA_STORE',
);

export const p3pPersonaStoreProvider: Provider = {
  provide: P3P_PERSONA_STORE,
  useFactory: p3pPersonaStoreFactory,
  deps: [NgxIndexedDBService],
};
