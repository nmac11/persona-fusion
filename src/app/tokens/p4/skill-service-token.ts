import { InjectionToken, Provider } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import skills from '../../data/p4/p4-skills.json';

function p4SkillFactory(): SkillService {
  return new SkillService(skills);
}

export const P4_SKILL = new InjectionToken<SkillService>(
  'P4_SKILL',
);

export const p4SkillProvider: Provider = {
  provide: P4_SKILL,
  useFactory: p4SkillFactory,
};
