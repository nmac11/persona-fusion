import affinities from '../data/p5/p5-affinities.json';
import compendium from '../data/p5/p5r-compendium.json';
import skills from '../data/p5/p5r-skills.json';
import arcana from '../data/p5/p5r-arcana.json';
import settingsTemplate from '../data/p5/p5r-settings-template.json';
import defaultSettings from '../data/p5/p5r-default-settings.json';
import specialFusionChart from '../data/p5/p5r-special-fusions.json';
import normalFusionChart from '../data/p5/p5r-normal-fusion-chart.json';
import gemFusionChart from '../data/p5/p5r-gem-fusion-chart.json';
import inheritanceChart from '../data/p5/p5-inheritance.json';
import { GameConfig } from '../models/game-config';

export const P5R_CONFIG: GameConfig = {
  title: 'p5r',
  fullTitle: 'Persona 5 Royal',
  randomInheritance: false,
  fusionSystem: 'new',
  compendium,
  skills,
  arcana,
  defaultSettings,
  settingsTemplate,
  specialFusionChart,
  normalFusionChart,
  gemFusionChart,
  inheritanceChart,
  affinities,
};
