import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from './simulator.component';
import { MaterialModule } from '../material/material.module';
import { ProvidersModule } from '../providers/providers.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { p3pSimulatorProvider } from '../tokens/p3p/simulator-service-token';
import { p3fesSimulatorProvider } from '../tokens/p3fes/simulator-service-token';
import { p3ansSimulatorProvider } from '../tokens/p3ans/simulator-service-token';
import { p4gSimulatorProvider } from '../tokens/p4g/simulator-service-token';
import { p4SimulatorProvider } from '../tokens/p4/simulator-service-token';
import { p5SimulatorProvider } from '../tokens/p5/simulator-service-token';
import { p5rSimulatorProvider } from '../tokens/p5r/simulator-service-token';
import { p3SkillInheritanceProvider } from '../tokens/p3/skill-inheritance-service-token';
import { p4SkillInheritanceProvider } from '../tokens/p4/skill-inheritance-service-token';
import { p4gSkillInheritanceProvider } from '../tokens/p4g/skill-inheritance-service-token';
import { p5SkillInheritanceProvider } from '../tokens/p5/skill-inheritance-service-token';
import { SharedModule } from '../shared/shared.module';
import { SaveFusionDialogComponent } from './components/save-fusion-dialog/save-fusion-dialog.component';
import { PersonaStoreModule } from '../persona-store/persona-store.module';

@NgModule({
  declarations: [
    SimulatorComponent,
    SaveFusionDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PersonaStoreModule,
  ],
  entryComponents: [
    SaveFusionDialogComponent,
  ],
  providers: [
    p3pSimulatorProvider,
    p3fesSimulatorProvider,
    p3ansSimulatorProvider,
    p4gSimulatorProvider,
    p4SimulatorProvider,
    p5SimulatorProvider,
    p5rSimulatorProvider,
    p3SkillInheritanceProvider,
    p4SkillInheritanceProvider,
    p4gSkillInheritanceProvider,
    p5SkillInheritanceProvider,
  ],
})
export class SimulatorModule {}
