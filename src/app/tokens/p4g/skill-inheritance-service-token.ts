import { InjectionToken, Provider } from '@angular/core';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import skillInheritanceChart from '../../data/p4/p4g-inheritance.json';
import { AppSettingsService } from '../../services/app-settings.service';

function p4gSkillInheritanceFactory(
  appSettingsService: AppSettingsService,
): SkillInheritanceService {
  return new SkillInheritanceService(skillInheritanceChart, appSettingsService);
}

export const P4G_SKILL_INHERITANCE = new InjectionToken<
  SkillInheritanceService
>('P4G_SKILL_INHERITANCE');

export const p4gSkillInheritanceProvider: Provider = {
  provide: P4G_SKILL_INHERITANCE,
  useFactory: p4gSkillInheritanceFactory,
  deps: [AppSettingsService],
};
