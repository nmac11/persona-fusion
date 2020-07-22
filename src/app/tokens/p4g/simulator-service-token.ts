import { InjectionToken, Provider } from '@angular/core';
import { P3P4SimulatorService } from '../../services/simulator.service';
import { CompendiumService } from '../../services/compendium.service';
import { P3P4FusionChartService } from '../../services/fusion-chart.service';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { P4G_COMPENDIUM } from '../../tokens/p4g/compendium-service-token';
import { P4G_FUSION_CHART } from '../../tokens/p4g/fusion-chart-service-token';
import { P4G_SKILL_INHERITANCE } from '../../tokens/p4g/skill-inheritance-service-token';
import { SettingsService } from '../../services/settings.service';
import { P4G_SETTINGS } from './settings-service-token';

function p4gSimulatorFactory(
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

export const P4G_SIMULATOR = new InjectionToken<P3P4SimulatorService>(
  'P4G_SIMULATOR',
);

export const p4gSimulatorProvider: Provider = {
  provide: P4G_SIMULATOR,
  useFactory: p4gSimulatorFactory,
  deps: [P4G_FUSION_CHART, P4G_COMPENDIUM, P4G_SKILL_INHERITANCE, P4G_SETTINGS],
};
