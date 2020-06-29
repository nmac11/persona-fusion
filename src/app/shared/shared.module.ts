import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaInfoComponent } from './persona-info/persona-info.component';
import { MaterialModule } from '../material/material.module';
import { InputDebouncerDirective } from './input-debouncer.directive';
import { ChangeDebouncerDirective } from './change-debouncer.directive';

@NgModule({
  declarations: [
    PersonaInfoComponent,
    InputDebouncerDirective,
    ChangeDebouncerDirective,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    PersonaInfoComponent,
    InputDebouncerDirective,
    ChangeDebouncerDirective,
  ],
})
export class SharedModule {}
