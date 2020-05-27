import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P3FESComponent } from './p3fes.component';
import { P3FESRoutingModule } from './p3fes-routing.module';
import { P3FESListComponent } from './components/list/list.component';
import { P3FESFusionsComponent } from './components/fusions/fusions.component';
import { P3FESNormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { P3FESTriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';
import { p3fesCompendiumProvider } from './helpers/compendium-service-helper';
import { p3fesFusionChartProvider } from './helpers/fusion-chart-service-helper';

@NgModule({
  declarations: [
    P3FESComponent,
    P3FESListComponent,
    P3FESFusionsComponent,
    P3FESNormalFusionsComponent,
    P3FESTriangleFusionsComponent,
  ],
  imports: [CommonModule, P3FESRoutingModule],
  providers: [p3fesCompendiumProvider, p3fesFusionChartProvider],
})
export class P3FESModule {}
