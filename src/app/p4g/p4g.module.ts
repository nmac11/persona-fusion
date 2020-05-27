import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P4GComponent } from './p4g.component';
import { P4GRoutingModule } from './p4g-routing.module';
import { P4GListComponent } from './components/list/list.component';
import { P4GFusionsComponent } from './components/fusions/fusions.component';
import { P4GNormalFusionsComponent } from './components/normal-fusions/normal-fusions.component';
import { P4GTriangleFusionsComponent } from './components/triangle-fusions/triangle-fusions.component';
import { p4gCompendiumProvider } from './helpers/compendium-service-helper';
import { p4gFusionChartProvider } from './helpers/fusion-chart-service-helper';

@NgModule({
  declarations: [
    P4GComponent,
    P4GListComponent,
    P4GFusionsComponent,
    P4GNormalFusionsComponent,
    P4GTriangleFusionsComponent,
  ],
  imports: [CommonModule, P4GRoutingModule],
  providers: [p4gCompendiumProvider, p4gFusionChartProvider],
})
export class P4GModule {}
