import { InjectionToken, Provider } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import skills from '../../data/p5/p5-skills.json';

function p5SkillFactory(): SkillService {
  return new SkillService(skills);
}

export const P5_SKILL = new InjectionToken<SkillService>(
  'P5_SKILL',
);

export const p5SkillProvider: Provider = {
  provide: P5_SKILL,
  useFactory: p5SkillFactory,
};
