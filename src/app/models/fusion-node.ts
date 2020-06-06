import { Persona } from './persona';

export interface FusionNode {
  persona: Persona;
  currentLevel?: Number;
  components?: FusionNode[];
}
