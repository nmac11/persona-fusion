import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { P5FusionChartService } from '../../services/fusion-chart.service';
import { P5R_COMPENDIUM } from './compendium-service-token';
import normalFusionChart from '../../data/p5/p5r-normal-fusion-chart.json';
import gemFusionChart from '../../data/p5/p5r-gem-fusion-chart.json';
import specialFusions from '../../data/p5/p5r-special-fusions.json';

function p5rFusionChartFactory(
  compendiumService: CompendiumService,
): P5FusionChartService {
  return new P5FusionChartService(
    compendiumService,
    specialFusions,
    normalFusionChart,
    gemFusionChart,
  );
}

export const P5R_FUSION_CHART = new InjectionToken<P5FusionChartService>(
  'P5R_FUSION_CHART',
);

export const p5rFusionChartProvider: Provider = {
  provide: P5R_FUSION_CHART,
  useFactory: p5rFusionChartFactory,
  deps: [P5R_COMPENDIUM],
};
