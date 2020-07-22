import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { P3P4FusionChartService } from '../../services/fusion-chart.service';
import { P4G_COMPENDIUM } from './compendium-service-token';
import normalFusionChart from '../../data/p4/p4g-normal-fusion-chart.json';
import triangleFusionChart from '../../data/p4/p4g-triangle-fusion-chart.json';
import specialFusions from '../../data/p4/p4-special-fusions.json';

function p4gFusionChartFactory(
  compendiumService: CompendiumService,
): P3P4FusionChartService {
  return new P3P4FusionChartService(
    compendiumService,
    specialFusions,
    normalFusionChart,
    triangleFusionChart,
  );
}

export const P4G_FUSION_CHART = new InjectionToken<P3P4FusionChartService>(
  'P4G_FUSION_CHART',
);

export const p4gFusionChartProvider: Provider = {
  provide: P4G_FUSION_CHART,
  useFactory: p4gFusionChartFactory,
  deps: [P4G_COMPENDIUM],
};
