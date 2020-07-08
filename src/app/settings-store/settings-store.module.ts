import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { p3pSettingsProvider } from '../tokens/p3p/settings-service-token';
import { p3fesSettingsProvider } from '../tokens/p3fes/settings-service-token';
import { p4SettingsProvider } from '../tokens/p4/settings-service-token';
import { p4gSettingsProvider } from '../tokens/p4g/settings-service-token';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    p3pSettingsProvider,
    p3fesSettingsProvider,
    p4SettingsProvider,
    p4gSettingsProvider,
  ]
})
export class SettingsStoreModule {}
