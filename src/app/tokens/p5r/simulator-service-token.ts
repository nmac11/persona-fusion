import { InjectionToken, Provider } from '@angular/core';
import { P5SimulatorService } from '../../services/simulator.service';
import { CompendiumService } from '../../services/compendium.service';
import { P5FusionChartService } from '../../services/fusion-chart.service';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { P5R_COMPENDIUM } from '../../tokens/p5r/compendium-service-token';
import { P5R_FUSION_CHART } from '../../tokens/p5r/fusion-chart-service-token';
import { P5_SKILL_INHERITANCE } from '../../tokens/p5/skill-inheritance-service-token';
import { SettingsService } from '../../services/settings.service';
import { P5R_SETTINGS } from './settings-service-token';

function p5rSimulatorFactory(
  fusionChartService: P5FusionChartService,
  compendiumService: CompendiumService,
  skillInheritanceService: SkillInheritanceService,
  settingsService: SettingsService,
): P5SimulatorService {
  return new P5SimulatorService(
    fusionChartService,
    compendiumService,
    skillInheritanceService,
    settingsService,
  );
}

export const P5R_SIMULATOR = new InjectionToken<P5SimulatorService>(
  'P5R_SIMULATOR',
);

export const p5rSimulatorProvider: Provider = {
  provide: P5R_SIMULATOR,
  useFactory: p5rSimulatorFactory,
  deps: [P5R_FUSION_CHART, P5R_COMPENDIUM, P5_SKILL_INHERITANCE, P5R_SETTINGS],
};
