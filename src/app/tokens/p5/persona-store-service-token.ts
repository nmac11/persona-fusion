import { InjectionToken, Provider } from '@angular/core';
import { PersonaStoreService } from '../../services/persona-store.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

function p5PersonaStoreFactory(
  ngxIndexedDB: NgxIndexedDBService,
): PersonaStoreService {
  return new PersonaStoreService('p5_personae', ngxIndexedDB);
}

export const P5_PERSONA_STORE = new InjectionToken<PersonaStoreService>(
  'P5_PERSONA_STORE',
);

export const p5PersonaStoreProvider: Provider = {
  provide: P5_PERSONA_STORE,
  useFactory: p5PersonaStoreFactory,
  deps: [NgxIndexedDBService],
};
