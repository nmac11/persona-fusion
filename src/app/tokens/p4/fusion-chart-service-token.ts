import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { P3P4FusionChartService } from '../../services/fusion-chart.service';
import { P4_COMPENDIUM } from './compendium-service-token';
import normalFusionChart from '../../data/p4/p4-normal-fusion-chart.json';
import triangleFusionChart from '../../data/p4/p4-triangle-fusion-chart.json';
import specialFusions from '../../data/p4/p4-special-fusions.json';

function p4FusionChartFactory(
  compendiumService: CompendiumService,
): P3P4FusionChartService {
  return new P3P4FusionChartService(
    compendiumService,
    specialFusions,
    normalFusionChart,
    triangleFusionChart,
  );
}

export const P4_FUSION_CHART = new InjectionToken<P3P4FusionChartService>(
  'P4_FUSION_CHART',
);

export const p4FusionChartProvider: Provider = {
  provide: P4_FUSION_CHART,
  useFactory: p4FusionChartFactory,
  deps: [P4_COMPENDIUM],
};
