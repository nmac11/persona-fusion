import { InjectionToken, Provider } from '@angular/core';
import { TriangleFusionService } from '../../services/triangle-fusion.service';
import { P3P4FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3P_COMPENDIUM } from './compendium-service-token';
import { P3P_FUSION_CHART } from './fusion-chart-service-token';

function p3pTriangleFusionFactory(
  arcanaFusionService: P3P4FusionChartService,
  compendiumService: CompendiumService,
): TriangleFusionService {
  return new TriangleFusionService(arcanaFusionService, compendiumService);
}

export const P3P_TRIANGLE_FUSION = new InjectionToken<TriangleFusionService>(
  'P3P_TRIANGLE_FUSION',
);

export const p3pTriangleFusionProvider: Provider = {
  provide: P3P_TRIANGLE_FUSION,
  useFactory: p3pTriangleFusionFactory,
  deps: [P3P_FUSION_CHART, P3P_COMPENDIUM],
};
