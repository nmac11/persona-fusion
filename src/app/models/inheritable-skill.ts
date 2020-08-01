import { Skill } from './skill';

export interface InheritableSkill extends Skill {
  probRatio: number;
  probability?: number;
}
