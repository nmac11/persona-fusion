import { Skill } from './skill';

export class Persona {
  id: number;
  name: string;
  level: number;
  arcana: number;
  arcanaName: string;
  skills: Skill[];
  stats: number[];
  inherits: string;
  affinities: string;
  ultimate?: boolean;
  special?: boolean;
  keyItem?: boolean;
  specialCondition?: string;
  preReqs?: string[];
  gem?: boolean;
  dlc?: boolean;
}
