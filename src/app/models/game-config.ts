import { Persona } from './persona';
import { Skill } from './skill';
import { SpecialFusions } from './special-fusions';

export interface GameConfig {
  title: string;
  fullTitle: string;
  randomInheritance: boolean;
  fusionSystem: 'old' | 'new';
  compendium: Persona[];
  skills: Skill[];
  arcana: string[];
  affinities: string[];
  defaultSettings: { [key: string]: boolean };
  settingsTemplate: {
    [key: string]: {
      [key: string]: { label: string; description?: string; unlocks: string[] };
    };
  };
  specialFusionChart: SpecialFusions;
  normalFusionChart: number[][][];
  triangleFusionChart?: number[][][];
  gemFusionChart?: { [key: string]: number[] };
  inheritanceChart: { [key: string]: { [key: string]: number } };
}
