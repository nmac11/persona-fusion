import { Injectable, Inject } from '@angular/core';
import { Skill } from '../models/skill';

@Injectable()
export class SkillInheritanceService {
  constructor(
    @Inject(Object) private inheritanceChart: any,
  ) {}

  findSkillProbRatio(skill: Skill, inheritType: string): number {
    if (skill.exclusive) return 0;
    let probRatio = this.inheritanceChart[inheritType][skill.type];
    if (isNaN(probRatio)) probRatio = 1;
    return probRatio / (skill.rank || 1);
  }
}
