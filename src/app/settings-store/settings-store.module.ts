import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDbModule } from '../app-db/app-db.module';
import { p3pSettingsProvider } from '../tokens/p3p/settings-token';
import { p3fesSettingsProvider } from '../tokens/p3fes/settings-token';
import { p4SettingsProvider } from '../tokens/p4/settings-token';
import { p4gSettingsProvider } from '../tokens/p4g/settings-token';

@NgModule({
  declarations: [],
  imports: [CommonModule, AppDbModule],
  providers: [
    p3pSettingsProvider,
    p3fesSettingsProvider,
    p4SettingsProvider,
    p4gSettingsProvider,
  ]
})
export class SettingsStoreModule {}
