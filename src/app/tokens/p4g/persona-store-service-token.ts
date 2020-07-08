import { InjectionToken, Provider } from '@angular/core';
import { PersonaStoreService } from '../../services/persona-store.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

function p4gPersonaStoreFactory(
  ngxIndexedDB: NgxIndexedDBService,
): PersonaStoreService {
  return new PersonaStoreService('p4g_personae', ngxIndexedDB);
}

export const P4G_PERSONA_STORE = new InjectionToken<PersonaStoreService>(
  'P4G_PERSONA_STORE',
);

export const p4gPersonaStoreProvider: Provider = {
  provide: P4G_PERSONA_STORE,
  useFactory: p4gPersonaStoreFactory,
  deps: [NgxIndexedDBService],
};
