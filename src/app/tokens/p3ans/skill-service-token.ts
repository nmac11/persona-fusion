import { InjectionToken, Provider } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import skills from '../../data/p3/p3fes-skills.json';

function p3ansSkillFactory(): SkillService {
  return new SkillService(skills);
}

export const P3ANS_SKILL = new InjectionToken<SkillService>(
  'P3ANS_SKILL',
);

export const p3ansSkillProvider: Provider = {
  provide: P3ANS_SKILL,
  useFactory: p3ansSkillFactory,
};
