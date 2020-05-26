import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { P3P_COMPENDIUM } from './compendium-service-helper';
import normalFusionChart from '../../data/p3/p3-normal-fusion-chart.json';
import triangleFusionChart from '../../data/p3/p3-triangle-fusion-chart.json';

function p3pFusionChartFactory(
  compendiumService: CompendiumService,
): FusionChartService {
  return new FusionChartService(
    compendiumService,
    normalFusionChart,
    triangleFusionChart,
  );
}

export const P3P_FUSION_CHART = new InjectionToken<FusionChartService>(
  'P3P_FUSION_CHART',
);

export const p3pFusionChartProvider: Provider = {
  provide: P3P_FUSION_CHART,
  useFactory: p3pFusionChartFactory,
  deps: [P3P_COMPENDIUM],
};
