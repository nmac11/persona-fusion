import { InjectionToken, Provider } from '@angular/core';
import { NormalFusionService } from '../../services/normal-fusion.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3ANS_COMPENDIUM } from './compendium-service-token';
import { P3ANS_FUSION_CHART } from './fusion-chart-service-token';

function p3ansNormalFusionFactory(
  arcanaFusionService: FusionChartService,
  compendiumService: CompendiumService,
): NormalFusionService {
  return new NormalFusionService(arcanaFusionService, compendiumService);
}

export const P3ANS_NORMAL_FUSION = new InjectionToken<NormalFusionService>(
  'P3ANS_NORMAL_FUSION',
);

export const p3ansNormalFusionProvider: Provider = {
  provide: P3ANS_NORMAL_FUSION,
  useFactory: p3ansNormalFusionFactory,
  deps: [P3ANS_FUSION_CHART, P3ANS_COMPENDIUM]
};
