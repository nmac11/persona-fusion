import { InjectionToken, Provider } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import skills from '../../data/p5/p5r-skills.json';

function p5rSkillFactory(): SkillService {
  return new SkillService(skills);
}

export const P5R_SKILL = new InjectionToken<SkillService>(
  'P5R_SKILL',
);

export const p5rSkillProvider: Provider = {
  provide: P5R_SKILL,
  useFactory: p5rSkillFactory,
};
