import { InjectionToken, Provider } from '@angular/core';
import { P3P4SimulatorService } from '../../services/simulator.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3P4FusionChartService } from '../../services/fusion-chart.service';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { P3ANS_COMPENDIUM } from '../../tokens/p3ans/compendium-service-token';
import { P3ANS_FUSION_CHART } from '../../tokens/p3ans/fusion-chart-service-token';
import { P3_SKILL_INHERITANCE } from '../../tokens/p3/skill-inheritance-service-token';
import { SettingsService } from '../../services/settings.service';
import { P3ANS_SETTINGS } from './settings-service-token';

function p3ansSimulatorFactory(
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

export const P3ANS_SIMULATOR = new InjectionToken<P3P4SimulatorService>(
  'P3ANS_SIMULATOR',
);

export const p3ansSimulatorProvider: Provider = {
  provide: P3ANS_SIMULATOR,
  useFactory: p3ansSimulatorFactory,
  deps: [
    P3ANS_FUSION_CHART,
    P3ANS_COMPENDIUM,
    P3_SKILL_INHERITANCE,
    P3ANS_SETTINGS,
  ],
};
