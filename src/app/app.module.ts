import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmClearDatabaseDialogComponent } from './components/confirm-clear-database-dialog/confirm-clear-database-dialog.component';
import { ReferenceComponent } from './components/reference/reference.component';
import { ContainerComponent } from './components/container/container.component';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { appDbConfig } from './config/app-db-config';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppSettingsComponent,
    ConfirmClearDatabaseDialogComponent,
    ReferenceComponent,
    ContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxIndexedDBModule.forRoot(appDbConfig),
    ReactiveFormsModule,
  ],
  providers: [Title],
  entryComponents: [ConfirmClearDatabaseDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
