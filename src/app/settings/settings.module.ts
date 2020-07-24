import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '../material/material.module';
import { AppDbModule } from '../app-db/app-db.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { p3pSettingsProvider } from '../tokens/p3p/settings-service-token';
import { p3fesSettingsProvider } from '../tokens/p3fes/settings-service-token';
import { p3ansSettingsProvider } from '../tokens/p3ans/settings-service-token';
import { p4SettingsProvider } from '../tokens/p4/settings-service-token';
import { p4gSettingsProvider } from '../tokens/p4g/settings-service-token';
import { p5SettingsProvider } from '../tokens/p5/settings-service-token';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [
    p3pSettingsProvider,
    p3fesSettingsProvider,
    p3ansSettingsProvider,
    p4SettingsProvider,
    p5SettingsProvider,
    p4gSettingsProvider,
  ],
})
export class SettingsModule {}
