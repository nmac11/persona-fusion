import { Injectable, Inject } from '@angular/core';
import { Skill } from '../models/skill';
import { partialMatchRegExp } from '../helpers/reg-exp-helpers';

@Injectable()
export class SkillService {
  constructor(@Inject(Array) private skills: Array<Skill>) {}

  getAll(type = null): Skill[] {
    return type
      ? this.skills.filter((skill) => partialMatchRegExp(type).test(skill.name))
      : this.skills;
  }
}
