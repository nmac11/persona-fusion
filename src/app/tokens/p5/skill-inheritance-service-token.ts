import { InjectionToken, Provider } from '@angular/core';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import skillInheritanceChart from '../../data/p5/p5-inheritance.json';
import { AppSettingsService } from '../../services/app-settings.service';

function p5SkillInheritanceFactory(
  appSettingsService: AppSettingsService,
): SkillInheritanceService {
  return new SkillInheritanceService(skillInheritanceChart, appSettingsService);
}

export const P5_SKILL_INHERITANCE = new InjectionToken<SkillInheritanceService>(
  'P5_SKILL_INHERITANCE',
);

export const p5SkillInheritanceProvider: Provider = {
  provide: P5_SKILL_INHERITANCE,
  useFactory: p5SkillInheritanceFactory,
  deps: [AppSettingsService],
};
