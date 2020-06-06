import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { P3FES_COMPENDIUM } from './compendium-service-token';
import normalFusionChart from '../../data/p3/p3-normal-fusion-chart.json';
import triangleFusionChart from '../../data/p3/p3-triangle-fusion-chart.json';
import specialFusions from '../../data/p3/p3-special-fusions.json';

function p3fesFusionChartFactory(
  compendiumService: CompendiumService,
): FusionChartService {
  return new FusionChartService(
    compendiumService,
    normalFusionChart,
    triangleFusionChart,
    specialFusions,
  );
}

export const P3FES_FUSION_CHART = new InjectionToken<FusionChartService>(
  'P3FES_FUSION_CHART',
);

export const p3fesFusionChartProvider: Provider = {
  provide: P3FES_FUSION_CHART,
  useFactory: p3fesFusionChartFactory,
  deps: [P3FES_COMPENDIUM],
};
