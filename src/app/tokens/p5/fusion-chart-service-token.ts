import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { P5FusionChartService } from '../../services/fusion-chart.service';
import { P5_COMPENDIUM } from './compendium-service-token';
import normalFusionChart from '../../data/p5/p5-normal-fusion-chart.json';
import gemFusionChart from '../../data/p5/p5-gem-fusion-chart.json';
import specialFusions from '../../data/p5/p5-special-fusions.json';

function p5FusionChartFactory(
  compendiumService: CompendiumService,
): P5FusionChartService {
  return new P5FusionChartService(
    compendiumService,
    specialFusions,
    normalFusionChart,
    gemFusionChart,
  );
}

export const P5_FUSION_CHART = new InjectionToken<P5FusionChartService>(
  'P5_FUSION_CHART',
);

export const p5FusionChartProvider: Provider = {
  provide: P5_FUSION_CHART,
  useFactory: p5FusionChartFactory,
  deps: [P5_COMPENDIUM],
};
