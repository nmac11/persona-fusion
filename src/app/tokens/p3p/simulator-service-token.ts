import { InjectionToken, Provider } from '@angular/core';
import { P3P4SimulatorService } from '../../services/simulator.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3P4FusionChartService } from '../../services/fusion-chart.service';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { P3P_COMPENDIUM } from '../../tokens/p3p/compendium-service-token';
import { P3P_FUSION_CHART } from '../../tokens/p3p/fusion-chart-service-token';
import { P3_SKILL_INHERITANCE } from '../../tokens/p3/skill-inheritance-service-token';
import { SettingsService } from '../../services/settings.service';
import { P3P_SETTINGS } from './settings-service-token';

function p3pSimulatorFactory(
  fusionChartService: P3P4FusionChartService,
  compendiumService: CompendiumService,
  skillInheritanceService: SkillInheritanceService,
  settingsService: SettingsService,
): P3P4SimulatorService {
  return new P3P4SimulatorService(
    fusionChartService,
    compendiumService,
    skillInheritanceService,
    settingsService,
  );
}

export const P3P_SIMULATOR = new InjectionToken<P3P4SimulatorService>(
  'P3P_SIMULATOR',
);

export const p3pSimulatorProvider: Provider = {
  provide: P3P_SIMULATOR,
  useFactory: p3pSimulatorFactory,
  deps: [P3P_FUSION_CHART, P3P_COMPENDIUM, P3_SKILL_INHERITANCE, P3P_SETTINGS],
};
