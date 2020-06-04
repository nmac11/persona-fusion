import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { PersonaListComponent } from './components/persona-list/persona-list.component';
import { MaterialModule } from '../material/material.module';
import { p3pCompendiumProvider } from '../tokens/p3p/compendium-service-token';
import { p3fesCompendiumProvider } from '../tokens/p3fes/compendium-service-token';
import { p4gCompendiumProvider } from '../tokens/p4g/compendium-service-token';
import { p3pFusionChartProvider } from '../tokens/p3p/fusion-chart-service-token';
import { p3fesFusionChartProvider } from '../tokens/p3fes/fusion-chart-service-token';
import { p4gFusionChartProvider } from '../tokens/p4g/fusion-chart-service-token';
import { PersonaComponent } from './components/persona/persona.component';
import { NormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { TriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';

@NgModule({
  declarations: [
    GameComponent,
    PersonaListComponent,
    PersonaComponent,
    NormalFusionsComponent,
    TriangleFusionsComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  providers: [
    p3pCompendiumProvider,
    p3fesCompendiumProvider,
    p4gCompendiumProvider,
    p3pFusionChartProvider,
    p3fesFusionChartProvider,
    p4gFusionChartProvider,
  ],
})
export class GameModule {}
