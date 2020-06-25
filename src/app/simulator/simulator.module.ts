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
import { p4SimulatorProvider } from '../tokens/p4/simulator-service-token';
import { p3SkillInheritanceProvider } from '../tokens/p3/skill-inheritance-service-token';
import { p4SkillInheritanceProvider } from '../tokens/p4/skill-inheritance-service-token';
import { p4gSkillInheritanceProvider } from '../tokens/p4g/skill-inheritance-service-token';
import { SkillsDialogComponent } from './components/skills-dialog/skills-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { FusionItemComponent } from './components/fusion-item/fusion-item.component';
import { DialogPersonaListComponent } from './components/dialog-persona-list/dialog-persona-list.component';

@NgModule({
  declarations: [
    SimulatorComponent,
    ListDialogComponent,
    SkillsDialogComponent,
    FusionItemComponent,
    DialogPersonaListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    DragDropModule,
    SharedModule,
  ],
  entryComponents: [ListDialogComponent, SkillsDialogComponent],
  providers: [
    p3pSimulatorProvider,
    p3fesSimulatorProvider,
    p4gSimulatorProvider,
    p4SimulatorProvider,
    p3SkillInheritanceProvider,
    p4SkillInheritanceProvider,
    p4gSkillInheritanceProvider,
  ],
})
export class SimulatorModule {}
