import { Persona } from './persona';
import { Skill } from './skill';

export interface FusionNode {
  persona: Persona;
  currentLevel: number;
  skills: Skill[];
  components?: FusionNode[];
  saveName?: string;
}
