import { InjectionToken, Provider } from '@angular/core';
import { NormalFusionService } from '../../services/normal-fusion.service';
import { ArcanaFusionService } from '../../services/arcana-fusion.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3P_COMPENDIUM } from './compendium-service-helper';
import { P3P_ARCANA_FUSION } from './arcana-fusion-service-helper';

function p3pNormalFusionFactory(
  arcanaFusionService: ArcanaFusionService,
  compendiumService: CompendiumService,
): NormalFusionService {
  return new NormalFusionService(arcanaFusionService, compendiumService);
}

export const P3P_NORMAL_FUSION = new InjectionToken<CompendiumService>(
  'P3P_NORMAL_FUSION',
);

export const p3pNormalFusionProvider: Provider = {
  provide: P3P_NORMAL_FUSION,
  useFactory: p3pNormalFusionFactory,
  deps: [P3P_ARCANA_FUSION, P3P_COMPENDIUM]
};
