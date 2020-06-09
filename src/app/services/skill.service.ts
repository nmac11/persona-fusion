import { Injectable, Inject } from '@angular/core';
import { Skill } from '../models/skill';

@Injectable()
export class SkillService {
  constructor(@Inject(Array) private skills: Array<Skill>) {}

  getAll(type = null): Skill[] {
    return this.skills;
  }
}
