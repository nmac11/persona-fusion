import { InjectionToken, Provider } from '@angular/core';
import { NormalFusionService } from '../../services/normal-fusion.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P5_COMPENDIUM } from './compendium-service-token';
import { P5_FUSION_CHART } from './fusion-chart-service-token';

function p5NormalFusionFactory(
  arcanaFusionService: FusionChartService,
  compendiumService: CompendiumService,
): NormalFusionService {
  return new NormalFusionService(arcanaFusionService, compendiumService);
}

export const P5_NORMAL_FUSION = new InjectionToken<NormalFusionService>(
  'P5_NORMAL_FUSION',
);

export const p5NormalFusionProvider: Provider = {
  provide: P5_NORMAL_FUSION,
  useFactory: p5NormalFusionFactory,
  deps: [P5_FUSION_CHART, P5_COMPENDIUM]
};
