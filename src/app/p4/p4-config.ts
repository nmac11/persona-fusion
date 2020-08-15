import compendium from '../data/p4/p4-compendium.json';
import skills from '../data/p4/p4-skills.json';
import arcana from '../data/p4/p4-arcana.json';
import settingsTemplate from '../data/p4/p4-settings-template.json';
import defaultSettings from '../data/p4/p4-default-settings.json';
import specialFusionChart from '../data/p4/p4-special-fusions.json';
import normalFusionChart from '../data/p4/p4-normal-fusion-chart.json';
import triangleFusionChart from '../data/p4/p4-triangle-fusion-chart.json';
import inheritanceChart from '../data/p4/p4-inheritance.json';
import { GameConfig } from '../models/game-config';

export const P4_CONFIG: GameConfig = {
  title: 'p4',
  fullTitle: 'Persona 4',
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
};
