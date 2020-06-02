import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { P4G_COMPENDIUM } from './compendium-service-token';
import normalFusionChart from '../../data/p4/p4g-normal-fusion-chart.json';
import triangleFusionChart from '../../data/p4/p4g-triangle-fusion-chart.json';

function p4gFusionChartFactory(
  compendiumService: CompendiumService,
): FusionChartService {
  return new FusionChartService(
    compendiumService,
    normalFusionChart,
    triangleFusionChart,
  );
}

export const P4G_FUSION_CHART = new InjectionToken<FusionChartService>(
  'P4G_FUSION_CHART',
);

export const p4gFusionChartProvider: Provider = {
  provide: P4G_FUSION_CHART,
  useFactory: p4gFusionChartFactory,
  deps: [P4G_COMPENDIUM],
};
