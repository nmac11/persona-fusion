import { InjectionToken, Provider } from '@angular/core';
import { NormalFusionService } from '../../services/normal-fusion.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3P_COMPENDIUM } from './compendium-service-token';
import { P3P_FUSION_CHART } from './fusion-chart-service-token';

function p3pNormalFusionFactory(
  arcanaFusionService: FusionChartService,
  compendiumService: CompendiumService,
): NormalFusionService {
  return new NormalFusionService(arcanaFusionService, compendiumService);
}

export const P3P_NORMAL_FUSION = new InjectionToken<NormalFusionService>(
  'P3P_NORMAL_FUSION',
);

export const p3pNormalFusionProvider: Provider = {
  provide: P3P_NORMAL_FUSION,
  useFactory: p3pNormalFusionFactory,
  deps: [P3P_FUSION_CHART, P3P_COMPENDIUM]
};
