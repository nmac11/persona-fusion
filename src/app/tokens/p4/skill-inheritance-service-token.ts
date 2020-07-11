import { InjectionToken, Provider } from '@angular/core';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import skillInheritanceChart from '../../data/p4/p4-inheritance.json';
import { AppSettingsService } from '../../services/app-settings.service';

function p4SkillInheritanceFactory(
  appSettingsService: AppSettingsService,
): SkillInheritanceService {
  return new SkillInheritanceService(skillInheritanceChart, appSettingsService);
}

export const P4_SKILL_INHERITANCE = new InjectionToken<SkillInheritanceService>(
  'P4_SKILL_INHERITANCE',
);

export const p4SkillInheritanceProvider: Provider = {
  provide: P4_SKILL_INHERITANCE,
  useFactory: p4SkillInheritanceFactory,
  deps: [AppSettingsService],
};
