import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '../material/material.module';
import { AppDbModule } from '../app-db/app-db.module';
import { SettingsStoreModule } from '../settings-store/settings-store.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, MaterialModule, SettingsStoreModule],
})
export class SettingsModule {}
