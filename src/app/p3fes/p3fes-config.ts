import affinities from '../data/p3/p3-affinities.json';
import compendiumMini from '../data/p3/p3fes-compendium-mini.json';
import skills from '../data/p3/p3fes-skills.json';
import arcana from '../data/p3/p3-arcana.json';
import settingsTemplate from '../data/p3/p3fes-settings-template.json';
import defaultSettings from '../data/p3/p3-default-settings.json';
import specialFusionChart from '../data/p3/p3-special-fusions.json';
import normalFusionChart from '../data/p3/p3-normal-fusion-chart.json';
import triangleFusionChart from '../data/p3/p3-triangle-fusion-chart.json';
import inheritanceChart from '../data/p3/p3-inheritance.json';
import { GameConfig } from '../models/game-config';
import { compendiumMigrator } from '../helpers/compendium-migrator';

const compendium = compendiumMigrator(compendiumMini, skills, arcana);

export const P3FES_CONFIG: GameConfig = {
  title: 'p3fes',
  fullTitle: 'Persona 3 FES: The Journey',
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
