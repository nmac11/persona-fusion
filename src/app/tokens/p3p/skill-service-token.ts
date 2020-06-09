import { InjectionToken, Provider } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import skills from '../../data/p3/p3p-skills.json';

function p3pSkillFactory(): SkillService {
  return new SkillService(skills);
}

export const P3P_SKILL = new InjectionToken<SkillService>(
  'P3P_SKILL',
);

export const p3pSkillProvider: Provider = {
  provide: P3P_SKILL,
  useFactory: p3pSkillFactory,
};
