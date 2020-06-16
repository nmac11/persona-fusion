import { Injectable, Inject } from '@angular/core';
import { Skill } from '../models/skill';
import { partialMatchRegExp, exactMatchRegExp } from '../helpers/reg-exp-helpers';

@Injectable()
export class SkillService {
  constructor(@Inject(Array) private skills: Array<Skill>) {}

  getAll(type = null): Skill[] {
    return type
      ? this.skills.filter((skill) => partialMatchRegExp(type).test(skill.name))
      : this.skills;
  }

  find(name: string): Skill {
    const kwdRegex = exactMatchRegExp(name);
    return this.skills.find((skill) => kwdRegex.test(skill.name));
  }
}
