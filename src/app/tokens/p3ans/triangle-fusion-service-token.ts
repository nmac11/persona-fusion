import { InjectionToken, Provider } from '@angular/core';
import { TriangleFusionService } from '../../services/triangle-fusion.service';
import { P3P4FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3ANS_COMPENDIUM } from './compendium-service-token';
import { P3ANS_FUSION_CHART } from './fusion-chart-service-token';

function p3ansTriangleFusionFactory(
  arcanaFusionService: P3P4FusionChartService,
  compendiumService: CompendiumService,
): TriangleFusionService {
  return new TriangleFusionService(arcanaFusionService, compendiumService);
}

export const P3ANS_TRIANGLE_FUSION = new InjectionToken<TriangleFusionService>(
  'P3ANS_TRIANGLE_FUSION',
);

export const p3ansTriangleFusionProvider: Provider = {
  provide: P3ANS_TRIANGLE_FUSION,
  useFactory: p3ansTriangleFusionFactory,
  deps: [P3ANS_FUSION_CHART, P3ANS_COMPENDIUM],
};
