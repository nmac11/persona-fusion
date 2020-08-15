import { Injectable, Inject } from '@angular/core';
import { Skill } from '../models/skill';
import { partialMatchRegExp, exactMatchRegExp } from '../helpers/reg-exp-helpers';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';
import { GameConfig } from '../models/game-config';

@Injectable()
export class SkillService {
  skills: Skill[];

  constructor(@Inject(GAME_CONFIG) private config: GameConfig) {
    this.skills = config.skills;
  }

  getAll(filter = null): Skill[] {
    return filter
      ? this.skills.filter((skill) => partialMatchRegExp(filter).test(skill.name))
      : this.skills;
  }

  find(name: string): Skill {
    const kwdRegex = exactMatchRegExp(name);
    return this.skills.find((skill) => kwdRegex.test(skill.name));
  }
}
