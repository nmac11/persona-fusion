import { InjectionToken, Provider } from '@angular/core';
import { TriangleFusionService } from '../../services/triangle-fusion.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3FES_COMPENDIUM } from './compendium-service-helper';
import { P3FES_FUSION_CHART } from './fusion-chart-service-helper';

function p3fesTriangleFusionFactory(
  arcanaFusionService: FusionChartService,
  compendiumService: CompendiumService,
): TriangleFusionService {
  return new TriangleFusionService(arcanaFusionService, compendiumService);
}

export const P3FES_TRIANGLE_FUSION = new InjectionToken<CompendiumService>(
  'P3FES_TRIANGLE_FUSION',
);

export const p3fesTriangleFusionProvider: Provider = {
  provide: P3FES_TRIANGLE_FUSION,
  useFactory: p3fesTriangleFusionFactory,
  deps: [P3FES_FUSION_CHART, P3FES_COMPENDIUM],
};
