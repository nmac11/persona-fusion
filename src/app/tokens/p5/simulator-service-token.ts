import { InjectionToken, Provider } from '@angular/core';
import { P5SimulatorService } from '../../services/simulator.service';
import { CompendiumService } from '../../services/compendium.service';
import { P5FusionChartService } from '../../services/fusion-chart.service';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { P5_COMPENDIUM } from '../../tokens/p5/compendium-service-token';
import { P5_FUSION_CHART } from '../../tokens/p5/fusion-chart-service-token';
import { P5_SKILL_INHERITANCE } from '../../tokens/p5/skill-inheritance-service-token';
import { SettingsService } from '../../services/settings.service';
import { P5_SETTINGS } from './settings-service-token';

function p5SimulatorFactory(
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

export const P5_SIMULATOR = new InjectionToken<P5SimulatorService>(
  'P5_SIMULATOR',
);

export const p5SimulatorProvider: Provider = {
  provide: P5_SIMULATOR,
  useFactory: p5SimulatorFactory,
  deps: [P5_FUSION_CHART, P5_COMPENDIUM, P5_SKILL_INHERITANCE, P5_SETTINGS],
};
