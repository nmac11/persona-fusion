import { Persona } from './persona';
import { Skill } from './skill';

export interface FusionNode {
  persona: Persona;
  currentLevel: number;
  skills: Skill[];
  saveName?: string;
  components?: FusionNode[];
}
