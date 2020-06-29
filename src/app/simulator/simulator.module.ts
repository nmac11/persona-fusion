import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from './simulator.component';
import { MaterialModule } from '../material/material.module';
import { ProvidersModule } from '../providers/providers.module';
import { ListDialogComponent } from './components/list-dialog/list-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SaveFusionDialogComponent } from './components/save-fusion-dialog/save-fusion-dialog.component';
import { PersonaStoreModule } from '../persona-store/persona-store.module';
import { DialogSavedListComponent } from './components/dialog-saved-list/dialog-saved-list.component';
import { DialogAllSkillsListComponent } from './components/dialog-all-skills-list/dialog-all-skills-list.component';
import { DialogLearnedSkillsListComponent } from './components/dialog-learned-skills-list/dialog-learned-skills-list.component';

@NgModule({
  declarations: [
    SimulatorComponent,
    ListDialogComponent,
    SkillsDialogComponent,
    FusionItemComponent,
    DialogPersonaListComponent,
    SaveFusionDialogComponent,
    DialogSavedListComponent,
    DialogAllSkillsListComponent,
    DialogLearnedSkillsListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    SharedModule,
    PersonaStoreModule,
  ],
  entryComponents: [
    ListDialogComponent,
    SkillsDialogComponent,
    SaveFusionDialogComponent,
  ],
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
