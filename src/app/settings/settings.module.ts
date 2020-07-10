import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '../material/material.module';
import { AppDbModule } from '../app-db/app-db.module';
import { SettingsStoreModule } from '../settings-store/settings-store.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SettingsStoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
