import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from './simulator.component';
import { MaterialModule } from '../material/material.module';
import { ProvidersModule } from '../providers/providers.module';
import { ListDialogComponent } from './components/list-dialog/list-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SimulatorComponent, ListDialogComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  entryComponents: [ListDialogComponent],
})
export class SimulatorModule {}
