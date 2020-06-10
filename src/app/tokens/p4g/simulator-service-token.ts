import { InjectionToken, Provider } from '@angular/core';
import { SimulatorService } from '../../services/simulator.service';
import { CompendiumService } from '../../services/compendium.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { P4G_COMPENDIUM } from '../..//tokens/p4g/compendium-service-token';
import { P4G_FUSION_CHART } from '../..//tokens/p4g/fusion-chart-service-token';

function p4gSimulatorFactory(
  fusionChartService: FusionChartService,
  compendiumService: CompendiumService,
): SimulatorService {
  return new SimulatorService(fusionChartService, compendiumService);
}

export const P4G_SIMULATOR = new InjectionToken<SimulatorService>(
  'P4G_SIMULATOR',
);

export const p4gSimulatorProvider: Provider = {
  provide: P4G_SIMULATOR,
  useFactory: p4gSimulatorFactory,
  deps: [P4G_FUSION_CHART, P4G_COMPENDIUM],
};