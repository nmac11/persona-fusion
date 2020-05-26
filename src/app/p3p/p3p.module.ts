import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P3PComponent } from './p3p.component';
import { P3PRoutingModule } from './p3p-routing.module';
import { ListComponent } from './components/list/list.component';
import { FusionsComponent } from './components/fusions/fusions.component';
import { NormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { TriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';
import { p3pCompendiumProvider } from './helpers/compendium-service-helper';
import { p3pFusionChartProvider } from './helpers/fusion-chart-service-helper';

@NgModule({
  declarations: [
    P3PComponent,
    ListComponent,
    FusionsComponent,
    NormalFusionsComponent,
    TriangleFusionsComponent,
  ],
  imports: [CommonModule, P3PRoutingModule],
  providers: [p3pCompendiumProvider, p3pFusionChartProvider],
})
export class P3PModule {}
