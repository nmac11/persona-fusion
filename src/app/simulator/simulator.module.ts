import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from './simulator.component';
import { MaterialModule } from '../material/material.module';
import { ProvidersModule } from '../providers/providers.module';
import { ListDialogComponent } from './components/list-dialog/list-dialog.component';
import { FormsModule } from '@angular/forms';
import { p3pSimulatorProvider } from '../tokens/p3p/simulator-service-token';
import { p3fesSimulatorProvider } from '../tokens/p3fes/simulator-service-token';
import { p4gSimulatorProvider } from '../tokens/p4g/simulator-service-token';
import { SkillsDialogComponent } from './components/skills-dialog/skills-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    SimulatorComponent,
    ListDialogComponent,
    SkillsDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, DragDropModule],
  entryComponents: [ListDialogComponent, SkillsDialogComponent],
  providers: [
    p3pSimulatorProvider,
    p3fesSimulatorProvider,
    p4gSimulatorProvider,
  ],
})
export class SimulatorModule {}
