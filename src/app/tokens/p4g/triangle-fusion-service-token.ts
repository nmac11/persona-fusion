import { InjectionToken, Provider } from '@angular/core';
import { TriangleFusionService } from '../../services/triangle-fusion.service';
import { P3P4FusionChartService } from '../../services/fusion-chart.service';
import { CompendiumService } from '../../services/compendium.service';
import { P4G_COMPENDIUM } from './compendium-service-token';
import { P4G_FUSION_CHART } from './fusion-chart-service-token';

function p4gTriangleFusionFactory(
  arcanaFusionService: P3P4FusionChartService,
  compendiumService: CompendiumService,
): TriangleFusionService {
  return new TriangleFusionService(arcanaFusionService, compendiumService);
}

export const P4G_TRIANGLE_FUSION = new InjectionToken<TriangleFusionService>(
  'P4G_TRIANGLE_FUSION',
);

export const p4gTriangleFusionProvider: Provider = {
  provide: P4G_TRIANGLE_FUSION,
  useFactory: p4gTriangleFusionFactory,
  deps: [P4G_FUSION_CHART, P4G_COMPENDIUM],
};
