import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaInfoComponent } from './persona-info/persona-info.component';
import { MaterialModule } from '../material/material.module';
import { InputDebouncerDirective } from './input-debouncer.directive';

@NgModule({
  declarations: [PersonaInfoComponent, InputDebouncerDirective],
  imports: [CommonModule, MaterialModule],
  exports: [PersonaInfoComponent, InputDebouncerDirective],
})
export class SharedModule {}
