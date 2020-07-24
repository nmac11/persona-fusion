import { InjectionToken, Provider } from '@angular/core';
import { PersonaStoreService } from '../../services/persona-store.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

function p3ansPersonaStoreFactory(
  ngxIndexedDB: NgxIndexedDBService,
): PersonaStoreService {
  return new PersonaStoreService('p3ans_personae', ngxIndexedDB);
}

export const P3ANS_PERSONA_STORE = new InjectionToken<PersonaStoreService>(
  'P3ANS_PERSONA_STORE',
);

export const p3ansPersonaStoreProvider: Provider = {
  provide: P3ANS_PERSONA_STORE,
  useFactory: p3ansPersonaStoreFactory,
  deps: [NgxIndexedDBService],
};
