import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { p3pCompendiumProvider } from '../tokens/p3p/compendium-service-token';
import { p3fesCompendiumProvider } from '../tokens/p3fes/compendium-service-token';
import { p4gCompendiumProvider } from '../tokens/p4g/compendium-service-token';
import { p3pFusionChartProvider } from '../tokens/p3p/fusion-chart-service-token';
import { p3fesFusionChartProvider } from '../tokens/p3fes/fusion-chart-service-token';
import { p4gFusionChartProvider } from '../tokens/p4g/fusion-chart-service-token';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    p3pCompendiumProvider,
    p3fesCompendiumProvider,
    p4gCompendiumProvider,
    p3pFusionChartProvider,
    p3fesFusionChartProvider,
    p4gFusionChartProvider,
  ],
})
export class ProvidersModule {}
