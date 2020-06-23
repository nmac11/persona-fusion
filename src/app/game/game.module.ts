import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { PersonaListComponent } from './components/persona-list/persona-list.component';
import { MaterialModule } from '../material/material.module';
import { PersonaComponent } from './components/persona/persona.component';
import { NormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { TriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';
import { ProvidersModule } from '../providers/providers.module';
import { SimulatorModule } from '../simulator/simulator.module';
import { NormalFusionsBottomSheetComponent } from './components/normal-fusions-bottom-sheet/normal-fusions-bottom-sheet.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GameComponent,
    PersonaListComponent,
    PersonaComponent,
    NormalFusionsComponent,
    TriangleFusionsComponent,
    NormalFusionsBottomSheetComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ProvidersModule,
    SimulatorModule,
    SharedModule,
  ],
  entryComponents: [NormalFusionsBottomSheetComponent],
})
export class GameModule {}
