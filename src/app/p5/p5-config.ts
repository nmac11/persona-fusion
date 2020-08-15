import affinities from '../data/p5/p5-affinities.json';
import compendiumMini from '../data/p5/p5-compendium-mini.json';
import skills from '../data/p5/p5-skills.json';
import arcana from '../data/p5/p5-arcana.json';
import settingsTemplate from '../data/p5/p5-settings-template.json';
import defaultSettings from '../data/p5/p5-default-settings.json';
import specialFusionChart from '../data/p5/p5-special-fusions.json';
import normalFusionChart from '../data/p5/p5-normal-fusion-chart.json';
import gemFusionChart from '../data/p5/p5-gem-fusion-chart.json';
import inheritanceChart from '../data/p5/p5-inheritance.json';
import { GameConfig } from '../models/game-config';
import { compendiumMigrator } from '../helpers/compendium-migrator';

const compendium = compendiumMigrator(compendiumMini, skills, arcana);

export const P5_CONFIG: GameConfig = {
  title: 'p5',
  fullTitle: 'Persona 5',
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
