import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { P5_COMPENDIUM } from './compendium-service-token';
import normalFusionChart from '../../data/p5/p5-normal-fusion-chart.json';
import triangleFusionChart from '../../data/p5/p5-triangle-fusion-chart.json';
import specialFusions from '../../data/p5/p5-special-fusions.json';

function p5FusionChartFactory(
  compendiumService: CompendiumService,
): FusionChartService {
  return new FusionChartService(
    compendiumService,
    normalFusionChart,
    triangleFusionChart,
    specialFusions,
  );
}

export const P5_FUSION_CHART = new InjectionToken<FusionChartService>(
  'P5_FUSION_CHART',
);

export const p5FusionChartProvider: Provider = {
  provide: P5_FUSION_CHART,
  useFactory: p5FusionChartFactory,
  deps: [P5_COMPENDIUM],
};
