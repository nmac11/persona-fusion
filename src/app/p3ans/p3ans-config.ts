import compendium from '../data/p3/p3ans-compendium.json';
import skills from '../data/p3/p3fes-skills.json';
import arcana from '../data/p3/p3-arcana.json';
import specialFusionChart from '../data/p3/p3ans-special-fusions.json';
import normalFusionChart from '../data/p3/p3-normal-fusion-chart.json';
import triangleFusionChart from '../data/p3/p3-triangle-fusion-chart.json';
import inheritanceChart from '../data/p3/p3-inheritance.json';
import { GameConfig } from '../models/game-config';

export const P3ANS_CONFIG: GameConfig = {
  title: 'p3ans',
  fullTitle: 'Persona 3 FES: The Answer',
  randomInheritance: true,
  fusionSystem: 'old',
  compendium,
  skills,
  arcana,
  defaultSettings: {},
  settingsTemplate: {},
  specialFusionChart,
  normalFusionChart,
  triangleFusionChart,
  inheritanceChart,
};
