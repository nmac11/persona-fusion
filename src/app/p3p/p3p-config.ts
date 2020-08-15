import affinities from '../data/p3/p3-affinities.json';
import compendium from '../data/p3/p3p-compendium.json';
import skills from '../data/p3/p3p-skills.json';
import arcana from '../data/p3/p3-arcana.json';
import settingsTemplate from '../data/p3/p3p-settings-template.json';
import defaultSettings from '../data/p3/p3-default-settings.json';
import specialFusionChart from '../data/p3/p3-special-fusions.json';
import normalFusionChart from '../data/p3/p3-normal-fusion-chart.json';
import triangleFusionChart from '../data/p3/p3-triangle-fusion-chart.json';
import inheritanceChart from '../data/p3/p3-inheritance.json';
import { GameConfig } from '../models/game-config';

export const P3P_CONFIG: GameConfig = {
  title: 'p3p',
  fullTitle: 'Persona 3 Portable',
  randomInheritance: true,
  fusionSystem: 'old',
  compendium,
  skills,
  arcana,
  defaultSettings,
  settingsTemplate,
  specialFusionChart,
  normalFusionChart,
  triangleFusionChart,
  inheritanceChart,
  affinities,
};
