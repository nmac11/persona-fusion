import { InjectionToken, Provider } from '@angular/core';
import { NormalFusionService } from '../../services/normal-fusion.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P5R_COMPENDIUM } from './compendium-service-token';
import { P5R_FUSION_CHART } from './fusion-chart-service-token';

function p5rNormalFusionFactory(
  arcanaFusionService: FusionChartService,
  compendiumService: CompendiumService,
): NormalFusionService {
  return new NormalFusionService(arcanaFusionService, compendiumService);
}

export const P5R_NORMAL_FUSION = new InjectionToken<NormalFusionService>(
  'P5R_NORMAL_FUSION',
);

export const p5rNormalFusionProvider: Provider = {
  provide: P5R_NORMAL_FUSION,
  useFactory: p5rNormalFusionFactory,
  deps: [P5R_FUSION_CHART, P5R_COMPENDIUM]
};
