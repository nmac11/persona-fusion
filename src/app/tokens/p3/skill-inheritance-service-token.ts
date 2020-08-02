import { InjectionToken, Provider } from '@angular/core';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import skillInheritanceChart from '../../data/p3/p3-inheritance.json';

function p3SkillInheritanceFactory(): SkillInheritanceService {
  return new SkillInheritanceService(skillInheritanceChart);
}

export const P3_SKILL_INHERITANCE = new InjectionToken<SkillInheritanceService>(
  'P3_SKILL_INHERITANCE',
);

export const p3SkillInheritanceProvider: Provider = {
  provide: P3_SKILL_INHERITANCE,
  useFactory: p3SkillInheritanceFactory,
};
