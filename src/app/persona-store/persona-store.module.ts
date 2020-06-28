import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { appDbConfig } from './config/app-db-config';
import { p3pPersonaStoreProvider } from '../tokens/p3p/persona-store-service-token';
import { p3fesPersonaStoreProvider } from '../tokens/p3fes/persona-store-service-token';
import { p4PersonaStoreProvider } from '../tokens/p4/persona-store-service-token';
import { p4gPersonaStoreProvider } from '../tokens/p4g/persona-store-service-token';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxIndexedDBModule.forRoot(appDbConfig)],
  providers: [
    p3pPersonaStoreProvider,
    p3fesPersonaStoreProvider,
    p4PersonaStoreProvider,
    p4gPersonaStoreProvider,
  ],
})
export class PersonaStoreModule {}
