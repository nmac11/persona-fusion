import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P3PRoutingModule } from './p3p-routing.module';
import { P3PListComponent } from './components/list/list.component';
import { P3PFusionsComponent } from './components/fusions/fusions.component';
import { P3PNormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { P3PTriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';
import { p3pCompendiumProvider } from './helpers/compendium-service-helper';
import { p3pFusionChartProvider } from './helpers/fusion-chart-service-helper';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    P3PListComponent,
    P3PFusionsComponent,
    P3PNormalFusionsComponent,
    P3PTriangleFusionsComponent,
  ],
  imports: [CommonModule, P3PRoutingModule, MaterialModule, SharedModule],
  providers: [p3pCompendiumProvider, p3pFusionChartProvider],
})
export class P3PModule {}
