import { InjectionToken, Provider } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import skills from '../../data/p4/p4-skills.json';

function p4gSkillFactory(): SkillService {
  return new SkillService(skills);
}

export const P4G_SKILL = new InjectionToken<SkillService>(
  'P4G_SKILL',
);

export const p4gSkillProvider: Provider = {
  provide: P4G_SKILL,
  useFactory: p4gSkillFactory,
};
