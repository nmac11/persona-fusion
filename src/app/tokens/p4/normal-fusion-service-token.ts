import { InjectionToken, Provider } from '@angular/core';
import { NormalFusionService } from '../../services/normal-fusion.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P4_COMPENDIUM } from './compendium-service-token';
import { P4_FUSION_CHART } from './fusion-chart-service-token';

function p4NormalFusionFactory(
  arcanaFusionService: FusionChartService,
  compendiumService: CompendiumService,
): NormalFusionService {
  return new NormalFusionService(arcanaFusionService, compendiumService);
}

export const P4_NORMAL_FUSION = new InjectionToken<CompendiumService>(
  'P4_NORMAL_FUSION',
);

export const p4NormalFusionProvider: Provider = {
  provide: P4_NORMAL_FUSION,
  useFactory: p4NormalFusionFactory,
  deps: [P4_FUSION_CHART, P4_COMPENDIUM]
};
