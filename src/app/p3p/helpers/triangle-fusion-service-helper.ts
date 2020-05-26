import { InjectionToken, Provider } from '@angular/core';
import { TriangleFusionService } from '../../services/triangle-fusion.service';
import { ArcanaFusionService } from '../../services/arcana-fusion.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3P_COMPENDIUM } from './compendium-service-helper';
import { P3P_ARCANA_FUSION } from './arcana-fusion-service-helper';

function p3pTriangleFusionFactory(
  arcanaFusionService: ArcanaFusionService,
  compendiumService: CompendiumService,
): TriangleFusionService {
  return new TriangleFusionService(arcanaFusionService, compendiumService);
}

export const P3P_TRIANGLE_FUSION = new InjectionToken<CompendiumService>(
  'P3P_TRIANGLE_FUSION',
);

export const p3pTriangleFusionProvider: Provider = {
  provide: P3P_TRIANGLE_FUSION,
  useFactory: p3pTriangleFusionFactory,
  deps: [P3P_ARCANA_FUSION, P3P_COMPENDIUM]
};
