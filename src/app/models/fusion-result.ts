import { InheritableSkill } from './inheritable-skill';
import { FusionNode } from './fusion-node';

export interface FusionResult extends FusionNode {
  skillsInheritedCount: number,
  inheritableSkills: InheritableSkill[];
}
