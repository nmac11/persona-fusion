import { InjectionToken, Provider } from '@angular/core';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import skillInheritanceChart from '../../data/p3/p3-inheritance.json';
import { AppSettingsService } from '../../services/app-settings.service';

function p3SkillInheritanceFactory(
  appSettingsService: AppSettingsService,
): SkillInheritanceService {
  return new SkillInheritanceService(skillInheritanceChart, appSettingsService);
}

export const P3_SKILL_INHERITANCE = new InjectionToken<SkillInheritanceService>(
  'P3_SKILL_INHERITANCE',
);

export const p3SkillInheritanceProvider: Provider = {
  provide: P3_SKILL_INHERITANCE,
  useFactory: p3SkillInheritanceFactory,
  deps: [AppSettingsService],
};
