import { InjectionToken, Provider } from '@angular/core';
import { TriangleFusionService } from '../../services/triangle-fusion.service';
import { P3P4FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3FES_COMPENDIUM } from './compendium-service-token';
import { P3FES_FUSION_CHART } from './fusion-chart-service-token';

function p3fesTriangleFusionFactory(
  arcanaFusionService: P3P4FusionChartService,
  compendiumService: CompendiumService,
): TriangleFusionService {
  return new TriangleFusionService(arcanaFusionService, compendiumService);
}

export const P3FES_TRIANGLE_FUSION = new InjectionToken<TriangleFusionService>(
  'P3FES_TRIANGLE_FUSION',
);

export const p3fesTriangleFusionProvider: Provider = {
  provide: P3FES_TRIANGLE_FUSION,
  useFactory: p3fesTriangleFusionFactory,
  deps: [P3FES_FUSION_CHART, P3FES_COMPENDIUM],
};
