import { InjectionToken, Provider } from '@angular/core';
import { SimulatorService } from '../../services/simulator.service';
import { CompendiumService } from '../../services/compendium.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { P3P_COMPENDIUM } from '../..//tokens/p3p/compendium-service-token';
import { P3P_FUSION_CHART } from '../..//tokens/p3p/fusion-chart-service-token';

function p3pSimulatorFactory(
  fusionChartService: FusionChartService,
  compendiumService: CompendiumService,
): SimulatorService {
  return new SimulatorService(fusionChartService, compendiumService);
}

export const P3P_SIMULATOR = new InjectionToken<SimulatorService>(
  'P3P_SIMULATOR',
);

export const p3pSimulatorProvider: Provider = {
  provide: P3P_SIMULATOR,
  useFactory: p3pSimulatorFactory,
  deps: [P3P_FUSION_CHART, P3P_COMPENDIUM],
};