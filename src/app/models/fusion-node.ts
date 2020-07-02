import { Persona } from './persona';
import { Skill } from './skill';

export interface FusionNode {
  id?: number;
  persona: Persona;
  currentLevel: number;
  skills: Skill[];
  components?: FusionNode[];
  saveName?: string;
}
