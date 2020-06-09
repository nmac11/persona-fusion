import { InjectionToken, Provider } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import skills from '../../data/p3/p3fes-skills.json';

function p3fesSkillFactory(): SkillService {
  return new SkillService(skills);
}

export const P3FES_SKILL = new InjectionToken<SkillService>(
  'P3FES_SKILL',
);

export const p3fesSkillProvider: Provider = {
  provide: P3FES_SKILL,
  useFactory: p3fesSkillFactory,
};
