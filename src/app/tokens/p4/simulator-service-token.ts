import { InjectionToken, Provider } from '@angular/core';
import { SimulatorService } from '../../services/simulator.service';
import { CompendiumService } from '../../services/compendium.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { P4_COMPENDIUM } from '../../tokens/p4/compendium-service-token';
import { P4_FUSION_CHART } from '../../tokens/p4/fusion-chart-service-token';
import { P4_SKILL_INHERITANCE } from '../../tokens/p4/skill-inheritance-service-token';
import { SettingsService } from '../../services/settings.service';
import { P4_SETTINGS } from './settings-service-token';

function p4SimulatorFactory(
  fusionChartService: FusionChartService,
  compendiumService: CompendiumService,
  skillInheritanceService: SkillInheritanceService,
  settingsService: SettingsService,
): SimulatorService {
  return new SimulatorService(
    fusionChartService,
    compendiumService,
    skillInheritanceService,
    settingsService,
  );
}

export const P4_SIMULATOR = new InjectionToken<SimulatorService>(
  'P4_SIMULATOR',
);

export const p4SimulatorProvider: Provider = {
  provide: P4_SIMULATOR,
  useFactory: p4SimulatorFactory,
  deps: [P4_FUSION_CHART, P4_COMPENDIUM, P4_SKILL_INHERITANCE, P4_SETTINGS],
};
