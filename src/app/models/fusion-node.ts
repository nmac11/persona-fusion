import { Persona } from './persona';
import { Skill } from './skill';

export interface FusionNode {
  id?: number;
  persona: Persona;
  currentLevel: number;
  skills: Skill[];
  fusionComponents?: FusionNode[];
  saveName?: string;
}
