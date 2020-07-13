import { InjectionToken } from '@angular/core';

import { P3P_COMPENDIUM } from '../tokens/p3p/compendium-service-token';
import { P3P_NORMAL_FUSION } from '../tokens/p3p/normal-fusion-service-token';
import { P3P_TRIANGLE_FUSION } from '../tokens/p3p/triangle-fusion-service-token';
import { P3P_FUSION_CHART } from '../tokens/p3p/fusion-chart-service-token';
import { P3P_SIMULATOR } from '../tokens/p3p/simulator-service-token';
import { P3P_SKILL } from '../tokens/p3p/skill-service-token';
import { P3P_PERSONA_STORE } from '../tokens/p3p/persona-store-service-token';
import { P3P_SETTINGS } from '../tokens/p3p/settings-service-token';

import { P3FES_COMPENDIUM } from '../tokens/p3fes/compendium-service-token';
import { P3FES_NORMAL_FUSION } from '../tokens/p3fes/normal-fusion-service-token';
import { P3FES_TRIANGLE_FUSION } from '../tokens/p3fes/triangle-fusion-service-token';
import { P3FES_FUSION_CHART } from '../tokens/p3fes/fusion-chart-service-token';
import { P3FES_SIMULATOR } from '../tokens/p3fes/simulator-service-token';
import { P3FES_SKILL } from '../tokens/p3fes/skill-service-token';
import { P3FES_PERSONA_STORE } from '../tokens/p3fes/persona-store-service-token';
import { P3FES_SETTINGS } from '../tokens/p3fes/settings-service-token';

import { P4G_COMPENDIUM } from '../tokens/p4g/compendium-service-token';
import { P4G_NORMAL_FUSION } from '../tokens/p4g/normal-fusion-service-token';
import { P4G_TRIANGLE_FUSION } from '../tokens/p4g/triangle-fusion-service-token';
import { P4G_FUSION_CHART } from '../tokens/p4g/fusion-chart-service-token';
import { P4G_SIMULATOR } from '../tokens/p4g/simulator-service-token';
import { P4G_PERSONA_STORE } from '../tokens/p4g/persona-store-service-token';
import { P4G_SETTINGS } from '../tokens/p4g/settings-service-token';

import { P4_COMPENDIUM } from '../tokens/p4/compendium-service-token';
import { P4_NORMAL_FUSION } from '../tokens/p4/normal-fusion-service-token';
import { P4_TRIANGLE_FUSION } from '../tokens/p4/triangle-fusion-service-token';
import { P4_FUSION_CHART } from '../tokens/p4/fusion-chart-service-token';
import { P4_SIMULATOR } from '../tokens/p4/simulator-service-token';
import { P4_SKILL } from '../tokens/p4/skill-service-token';
import { P4_PERSONA_STORE } from '../tokens/p4/persona-store-service-token';
import { P4_SETTINGS } from '../tokens/p4/settings-service-token';

import { P5_COMPENDIUM } from '../tokens/p5/compendium-service-token';
import { P5_NORMAL_FUSION } from '../tokens/p5/normal-fusion-service-token';
import { P5_TRIANGLE_FUSION } from '../tokens/p5/triangle-fusion-service-token';
import { P5_FUSION_CHART } from '../tokens/p5/fusion-chart-service-token';
import { P5_SIMULATOR } from '../tokens/p5/simulator-service-token';
import { P5_SKILL } from '../tokens/p5/skill-service-token';
import { P5_PERSONA_STORE } from '../tokens/p5/persona-store-service-token';
import { P5_SETTINGS } from '../tokens/p5/settings-service-token';

import { CompendiumService } from '../services/compendium.service';
import { NormalFusionService } from '../services/normal-fusion.service';
import { TriangleFusionService } from '../services/triangle-fusion.service';
import { FusionChartService } from '../services/fusion-chart.service';
import { SimulatorService } from '../services/simulator.service';
import { SkillService } from '../services/skill.service';
import { PersonaStoreService } from '../services/persona-store.service';
import { SettingsService } from '../services/settings.service';

export interface ServiceTokenSet {
  compendium: InjectionToken<CompendiumService>;
  normalFusion: InjectionToken<NormalFusionService>;
  triangleFusion: InjectionToken<TriangleFusionService>;
  fusionChart: InjectionToken<FusionChartService>;
  simulator: InjectionToken<SimulatorService>;
  skill: InjectionToken<SkillService>;
  personaStore: InjectionToken<PersonaStoreService>;
  settings: InjectionToken<SettingsService>;
}

export const serviceToken: { [key: string]: ServiceTokenSet } = {
  p3p: {
    compendium: P3P_COMPENDIUM,
    normalFusion: P3P_NORMAL_FUSION,
    triangleFusion: P3P_TRIANGLE_FUSION,
    fusionChart: P3P_FUSION_CHART,
    simulator: P3P_SIMULATOR,
    skill: P3P_SKILL,
    personaStore: P3P_PERSONA_STORE,
    settings: P3P_SETTINGS,
  },
  p3fes: {
    compendium: P3FES_COMPENDIUM,
    normalFusion: P3FES_NORMAL_FUSION,
    triangleFusion: P3FES_TRIANGLE_FUSION,
    fusionChart: P3FES_FUSION_CHART,
    simulator: P3FES_SIMULATOR,
    skill: P3FES_SKILL,
    personaStore: P3FES_PERSONA_STORE,
    settings: P3FES_SETTINGS,
  },
  p4g: {
    compendium: P4G_COMPENDIUM,
    normalFusion: P4G_NORMAL_FUSION,
    triangleFusion: P4G_TRIANGLE_FUSION,
    fusionChart: P4G_FUSION_CHART,
    simulator: P4G_SIMULATOR,
    skill: P4_SKILL,
    personaStore: P4G_PERSONA_STORE,
    settings: P4G_SETTINGS,
  },
  p4: {
    compendium: P4_COMPENDIUM,
    normalFusion: P4_NORMAL_FUSION,
    triangleFusion: P4_TRIANGLE_FUSION,
    fusionChart: P4_FUSION_CHART,
    simulator: P4_SIMULATOR,
    skill: P4_SKILL,
    personaStore: P4_PERSONA_STORE,
    settings: P4_SETTINGS,
  },
  p5: {
    compendium: P5_COMPENDIUM,
    normalFusion: P5_NORMAL_FUSION,
    triangleFusion: P5_TRIANGLE_FUSION,
    fusionChart: P5_FUSION_CHART,
    simulator: P5_SIMULATOR,
    skill: P5_SKILL,
    personaStore: P5_PERSONA_STORE,
    settings: P5_SETTINGS,
  },
};
