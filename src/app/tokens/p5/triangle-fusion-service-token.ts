import { InjectionToken, Provider } from '@angular/core';
import { TriangleFusionService } from '../../services/triangle-fusion.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P5_COMPENDIUM } from './compendium-service-token';
import { P5_FUSION_CHART } from './fusion-chart-service-token';

function p5TriangleFusionFactory(
  arcanaFusionService: FusionChartService,
  compendiumService: CompendiumService,
): TriangleFusionService {
  return new TriangleFusionService(arcanaFusionService, compendiumService);
}

export const P5_TRIANGLE_FUSION = new InjectionToken<CompendiumService>(
  'P5_TRIANGLE_FUSION',
);

export const p5TriangleFusionProvider: Provider = {
  provide: P5_TRIANGLE_FUSION,
  useFactory: p5TriangleFusionFactory,
  deps: [P5_FUSION_CHART, P5_COMPENDIUM],
};
