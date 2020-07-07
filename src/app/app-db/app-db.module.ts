import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { appDbConfig } from './config/app-db-config';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxIndexedDBModule.forRoot(appDbConfig)],
})
export class AppDbModule {}
