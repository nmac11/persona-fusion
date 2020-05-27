import { InjectionToken, Provider } from '@angular/core';
import { NormalFusionService } from '../../services/normal-fusion.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3FES_COMPENDIUM } from './compendium-service-helper';
import { P3FES_FUSION_CHART } from './fusion-chart-service-helper';

function p3fesNormalFusionFactory(
  arcanaFusionService: FusionChartService,
  compendiumService: CompendiumService,
): NormalFusionService {
  return new NormalFusionService(arcanaFusionService, compendiumService);
}

export const P3FES_NORMAL_FUSION = new InjectionToken<CompendiumService>(
  'P3FES_NORMAL_FUSION',
);

export const p3fesNormalFusionProvider: Provider = {
  provide: P3FES_NORMAL_FUSION,
  useFactory: p3fesNormalFusionFactory,
  deps: [P3FES_FUSION_CHART, P3FES_COMPENDIUM]
};
