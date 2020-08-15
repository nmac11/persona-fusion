import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from './simulator.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SaveFusionDialogComponent } from './components/save-fusion-dialog/save-fusion-dialog.component';
import { FusionSkillsComponent } from './components/fusion-skills/fusion-skills.component';

@NgModule({
  declarations: [
    SimulatorComponent,
    SaveFusionDialogComponent,
    FusionSkillsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    SimulatorComponent,
    SaveFusionDialogComponent,
    FusionSkillsComponent,
  ],
  entryComponents: [SaveFusionDialogComponent],
})
export class SimulatorPagesModule {}
