import { InjectionToken, Provider } from '@angular/core';
import { GemFusionService } from '../../services/gem-fusion.service';
import { P5FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P5R_COMPENDIUM } from './compendium-service-token';
import { P5R_FUSION_CHART } from './fusion-chart-service-token';

function p5rGemFusionFactory(
  arcanaFusionService: P5FusionChartService,
  compendiumService: CompendiumService,
): GemFusionService {
  return new GemFusionService(arcanaFusionService, compendiumService);
}

export const P5R_GEM_FUSION = new InjectionToken<GemFusionService>(
  'P5R_GEM_FUSION',
);

export const p5rGemFusionProvider: Provider = {
  provide: P5R_GEM_FUSION,
  useFactory: p5rGemFusionFactory,
  deps: [P5R_FUSION_CHART, P5R_COMPENDIUM]
};
