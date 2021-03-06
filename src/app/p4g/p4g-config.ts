import affinities from '../data/p4/p4-affinities.json';
import compendiumMini from '../data/p4/p4g-compendium-mini.json';
import skills from '../data/p4/p4-skills.json';
import arcana from '../data/p4/p4g-arcana.json';
import settingsTemplate from '../data/p4/p4g-settings-template.json';
import defaultSettings from '../data/p4/p4g-default-settings.json';
import specialFusionChart from '../data/p4/p4-special-fusions.json';
import normalFusionChart from '../data/p4/p4g-normal-fusion-chart.json';
import triangleFusionChart from '../data/p4/p4g-triangle-fusion-chart.json';
import inheritanceChart from '../data/p4/p4g-inheritance.json';
import { GameConfig } from '../models/game-config';
import { compendiumMigrator } from '../helpers/compendium-migrator';

const compendium = compendiumMigrator(compendiumMini, skills, arcana);

export const P4G_CONFIG: GameConfig = {
  title: 'p4g',
  fullTitle: 'Persona 4 Golden',
  randomInheritance: false,
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
