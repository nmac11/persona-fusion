import { InjectionToken, Provider } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { ArcanaFusionService } from '../../services/arcana-fusion.service';
import { P3P_COMPENDIUM } from './compendium-service-helper';
import normalFusionChart from '../../data/p3/p3-normal-fusion-chart.json';
import triangleFusionChart from '../../data/p3/p3-triangle-fusion-chart.json';

function p3pFusionFactory(
  compendiumService: CompendiumService,
): ArcanaFusionService {
  return new ArcanaFusionService(
    compendiumService,
    normalFusionChart,
    triangleFusionChart,
  );
}

export const P3P_ARCANA_FUSION = new InjectionToken<ArcanaFusionService>(
  'P3P_ARCANA_FUSION',
);

export const p3pArcanaFusionProvider: Provider = {
  provide: P3P_ARCANA_FUSION,
  useFactory: p3pFusionFactory,
  deps: [P3P_COMPENDIUM],
};
