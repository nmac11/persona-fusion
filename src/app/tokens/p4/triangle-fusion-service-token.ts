import { InjectionToken, Provider } from '@angular/core';
import { TriangleFusionService } from '../../services/triangle-fusion.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P4_COMPENDIUM } from './compendium-service-token';
import { P4_FUSION_CHART } from './fusion-chart-service-token';

function p4TriangleFusionFactory(
  arcanaFusionService: FusionChartService,
  compendiumService: CompendiumService,
): TriangleFusionService {
  return new TriangleFusionService(arcanaFusionService, compendiumService);
}

export const P4_TRIANGLE_FUSION = new InjectionToken<CompendiumService>(
  'P4_TRIANGLE_FUSION',
);

export const p4TriangleFusionProvider: Provider = {
  provide: P4_TRIANGLE_FUSION,
  useFactory: p4TriangleFusionFactory,
  deps: [P4_FUSION_CHART, P4_COMPENDIUM],
};
