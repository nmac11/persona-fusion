import { Persona } from './persona';

export interface FusionNode {
  persona: Persona;
  currentLevel: number;
  components?: FusionNode[];
}
