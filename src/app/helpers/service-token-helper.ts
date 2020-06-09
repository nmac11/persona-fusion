import { P3P_COMPENDIUM } from '../tokens/p3p/compendium-service-token';
import { P3P_NORMAL_FUSION } from '../tokens/p3p/normal-fusion-service-token';
import { P3P_TRIANGLE_FUSION } from '../tokens/p3p/triangle-fusion-service-token';
import { P3FES_COMPENDIUM } from '../tokens/p3fes/compendium-service-token';
import { P3FES_NORMAL_FUSION } from '../tokens/p3fes/normal-fusion-service-token';
import { P3FES_TRIANGLE_FUSION } from '../tokens/p3fes/triangle-fusion-service-token';
import { P4G_COMPENDIUM } from '../tokens/p4g/compendium-service-token';
import { P4G_NORMAL_FUSION } from '../tokens/p4g/normal-fusion-service-token';
import { P4G_TRIANGLE_FUSION } from '../tokens/p4g/triangle-fusion-service-token';
import { P3P_FUSION_CHART } from '../tokens/p3p/fusion-chart-service-token';
import { P3FES_FUSION_CHART } from '../tokens/p3fes/fusion-chart-service-token';
import { P4G_FUSION_CHART } from '../tokens/p4g/fusion-chart-service-token';
import { P3P_SIMULATOR } from '../tokens/p3p/simulator-service-token';
import { P3FES_SIMULATOR } from '../tokens/p3fes/simulator-service-token';
import { P4G_SIMULATOR } from '../tokens/p4g/simulator-service-token';
import { P3P_SKILL } from '../tokens/p3p/skill-service-token';
import { P3FES_SKILL } from '../tokens/p3fes/skill-service-token';
import { P4G_SKILL } from '../tokens/p4g/skill-service-token';

export const serviceToken: any = {
  p3p: {
    compendium: P3P_COMPENDIUM,
    normalFusion: P3P_NORMAL_FUSION,
    triangleFusion: P3P_TRIANGLE_FUSION,
    fusionChart: P3P_FUSION_CHART,
    simulator: P3P_SIMULATOR,
    skill: P3P_SKILL,
  },
  p3fes: {
    compendium: P3FES_COMPENDIUM,
    normalFusion: P3FES_NORMAL_FUSION,
    triangleFusion: P3FES_TRIANGLE_FUSION,
    fusionChart: P3FES_FUSION_CHART,
    simulator: P3FES_SIMULATOR,
    skill: P3FES_SKILL,
  },
  p4g: {
    compendium: P4G_COMPENDIUM,
    normalFusion: P4G_NORMAL_FUSION,
    triangleFusion: P4G_TRIANGLE_FUSION,
    fusionChart: P4G_FUSION_CHART,
    simulator: P4G_SIMULATOR,
    skill: P4G_SKILL,
  },
};
