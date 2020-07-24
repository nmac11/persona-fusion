import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { p3pPersonaStoreProvider } from '../tokens/p3p/persona-store-service-token';
import { p3fesPersonaStoreProvider } from '../tokens/p3fes/persona-store-service-token';
import { p3ansPersonaStoreProvider } from '../tokens/p3ans/persona-store-service-token';
import { p4PersonaStoreProvider } from '../tokens/p4/persona-store-service-token';
import { p4gPersonaStoreProvider } from '../tokens/p4g/persona-store-service-token';
import { p5PersonaStoreProvider } from '../tokens/p5/persona-store-service-token';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    p3pPersonaStoreProvider,
    p3fesPersonaStoreProvider,
    p3ansPersonaStoreProvider,
    p4PersonaStoreProvider,
    p4gPersonaStoreProvider,
    p5PersonaStoreProvider,
  ],
})
export class PersonaStoreModule {}
