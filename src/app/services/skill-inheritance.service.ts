import { Injectable, Inject } from '@angular/core';
import { Skill } from '../models/skill';
import { GameConfig } from '../models/game-config';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';

@Injectable()
export class SkillInheritanceService {
  inheritanceChart: any;
  
  constructor(
    @Inject(GAME_CONFIG) private config: GameConfig,
  ) {
    this.inheritanceChart = this.config.inheritanceChart;
  }

  findSkillProbRatio(skill: Skill, inheritType: string): number {
    if (skill.exclusive) return 0;
    let probRatio = this.inheritanceChart[inheritType][skill.type];
    if (isNaN(probRatio)) probRatio = 1;
    return probRatio / (skill.rank || 1);
  }
}
