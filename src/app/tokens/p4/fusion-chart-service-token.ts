import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { P4_COMPENDIUM } from './compendium-service-token';
import normalFusionChart from '../../data/p4/p4-normal-fusion-chart.json';
import triangleFusionChart from '../../data/p4/p4-triangle-fusion-chart.json';
import specialFusions from '../../data/p4/p4-special-fusions.json';

function p4FusionChartFactory(
  compendiumService: CompendiumService,
): FusionChartService {
  return new FusionChartService(
    compendiumService,
    normalFusionChart,
    triangleFusionChart,
    specialFusions,
  );
}

export const P4_FUSION_CHART = new InjectionToken<FusionChartService>(
  'P4_FUSION_CHART',
);

export const p4FusionChartProvider: Provider = {
  provide: P4_FUSION_CHART,
  useFactory: p4FusionChartFactory,
  deps: [P4_COMPENDIUM],
};
