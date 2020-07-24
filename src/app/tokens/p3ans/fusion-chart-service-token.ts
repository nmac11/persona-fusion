import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { P3P4FusionChartService } from '../../services/fusion-chart.service';
import { P3ANS_COMPENDIUM } from './compendium-service-token';
import normalFusionChart from '../../data/p3/p3-normal-fusion-chart.json';
import triangleFusionChart from '../../data/p3/p3-triangle-fusion-chart.json';
import specialFusions from '../../data/p3/p3-special-fusions.json';

function p3ansFusionChartFactory(
  compendiumService: CompendiumService,
): P3P4FusionChartService {
  return new P3P4FusionChartService(
    compendiumService,
    specialFusions,
    normalFusionChart,
    triangleFusionChart,
  );
}

export const P3ANS_FUSION_CHART = new InjectionToken<P3P4FusionChartService>(
  'P3ANS_FUSION_CHART',
);

export const p3ansFusionChartProvider: Provider = {
  provide: P3ANS_FUSION_CHART,
  useFactory: p3ansFusionChartFactory,
  deps: [P3ANS_COMPENDIUM],
};
