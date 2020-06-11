import { InjectionToken, Provider } from '@angular/core';
import { SimulatorService } from '../../services/simulator.service';
import { CompendiumService } from '../../services/compendium.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { P3FES_COMPENDIUM } from '../../tokens/p3fes/compendium-service-token';
import { P3FES_FUSION_CHART } from '../../tokens/p3fes/fusion-chart-service-token';
import { P3_SKILL_INHERITANCE } from '../../tokens/p3/skill-inheritance-service-token';

function p3fesSimulatorFactory(
  fusionChartService: FusionChartService,
  compendiumService: CompendiumService,
  skillInheritanceService: SkillInheritanceService,
): SimulatorService {
  return new SimulatorService(
    fusionChartService,
    compendiumService,
    skillInheritanceService,
  );
}

export const P3FES_SIMULATOR = new InjectionToken<SimulatorService>(
  'P3FES_SIMULATOR',
);

export const p3fesSimulatorProvider: Provider = {
  provide: P3FES_SIMULATOR,
  useFactory: p3fesSimulatorFactory,
  deps: [P3FES_FUSION_CHART, P3FES_COMPENDIUM, P3_SKILL_INHERITANCE],
};
