import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P3FESRoutingModule } from './p3fes-routing.module';
import { P3FESListComponent } from './components/list/list.component';
import { P3FESFusionsComponent } from './components/fusions/fusions.component';
import { P3FESNormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { P3FESTriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';
import { p3fesCompendiumProvider } from './helpers/compendium-service-helper';
import { p3fesFusionChartProvider } from './helpers/fusion-chart-service-helper';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    P3FESListComponent,
    P3FESFusionsComponent,
    P3FESNormalFusionsComponent,
    P3FESTriangleFusionsComponent,
  ],
  imports: [CommonModule, P3FESRoutingModule, MaterialModule, SharedModule],
  providers: [p3fesCompendiumProvider, p3fesFusionChartProvider],
})
export class P3FESModule {}
