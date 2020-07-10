import { Skill } from './skill';
import { Stats } from './stats';

export class Persona {
  id: number;
  name: string;
  level: number;
  arcana: number;
  arcanaName: string;
  skills: Skill[];
  stats: Stats;
  inherits: string;
  affinities: { [key: string]: string };
  ultimate?: boolean;
  special?: boolean;
  keyItem?: boolean;
  specialCondition?: string;
  preReqs?: string[];
}
