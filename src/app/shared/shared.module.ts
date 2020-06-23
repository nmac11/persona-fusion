import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaInfoComponent } from './persona-info/persona-info.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [PersonaInfoComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PersonaInfoComponent],
})
export class SharedModule {}
