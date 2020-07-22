import { InjectionToken, Provider } from '@angular/core';
import { GemFusionService } from '../../services/gem-fusion.service';
import { P5FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P5_COMPENDIUM } from './compendium-service-token';
import { P5_FUSION_CHART } from './fusion-chart-service-token';

function p5GemFusionFactory(
  arcanaFusionService: P5FusionChartService,
  compendiumService: CompendiumService,
): GemFusionService {
  return new GemFusionService(arcanaFusionService, compendiumService);
}

export const P5_GEM_FUSION = new InjectionToken<GemFusionService>(
  'P5_GEM_FUSION',
);

export const p5GemFusionProvider: Provider = {
  provide: P5_GEM_FUSION,
  useFactory: p5GemFusionFactory,
  deps: [P5_FUSION_CHART, P5_COMPENDIUM]
};
