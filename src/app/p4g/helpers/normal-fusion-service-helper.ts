import { InjectionToken, Provider } from '@angular/core';
import { NormalFusionService } from '../../services/normal-fusion.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P4G_COMPENDIUM } from './compendium-service-helper';
import { P4G_FUSION_CHART } from './fusion-chart-service-helper';

function p4gNormalFusionFactory(
  arcanaFusionService: FusionChartService,
  compendiumService: CompendiumService,
): NormalFusionService {
  return new NormalFusionService(arcanaFusionService, compendiumService);
}

export const P4G_NORMAL_FUSION = new InjectionToken<CompendiumService>(
  'P4G_NORMAL_FUSION',
);

export const p4gNormalFusionProvider: Provider = {
  provide: P4G_NORMAL_FUSION,
  useFactory: p4gNormalFusionFactory,
  deps: [P4G_FUSION_CHART, P4G_COMPENDIUM]
};
