import { Persona } from './persona';
import { Skill } from './skill';
import { SpecialFusion } from './special-fusion';

export interface GameConfig {
  title: string;
  fullTitle: string;
  randomInheritance: boolean;
  fusionSystem: 'old' | 'new';
  compendium: Persona[];
  skills: Skill[];
  arcana: string[];
  defaultSettings: { [key: string]: boolean };
  settingsTemplate: {
    [key: string]: {
      [key: string]: { label: string; description?: string; unlocks: string[] };
    };
  };
  specialFusionChart: SpecialFusion[];
  normalFusionChart: number[][][];
  triangleFusionChart?: number[][][];
  gemFusionChart?: { [key: string]: number[] };
  inheritanceChart: { [key: string]: { [key: string]: number } };
}
