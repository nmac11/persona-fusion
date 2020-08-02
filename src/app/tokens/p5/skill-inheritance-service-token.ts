import { InjectionToken, Provider } from '@angular/core';
import { SkillInheritanceService } from '../../services/skill-inheritance.service';
import { FusionChartService } from '../../services/fusion-chart.service';
import skillInheritanceChart from '../../data/p5/p5-inheritance.json';

function p5SkillInheritanceFactory(): SkillInheritanceService {
  return new SkillInheritanceService(skillInheritanceChart);
}

export const P5_SKILL_INHERITANCE = new InjectionToken<SkillInheritanceService>(
  'P5_SKILL_INHERITANCE',
);

export const p5SkillInheritanceProvider: Provider = {
  provide: P5_SKILL_INHERITANCE,
  useFactory: p5SkillInheritanceFactory,
};
