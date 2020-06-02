import { P3P_COMPENDIUM } from '../tokens/p3p/compendium-service-token';
import { P3P_NORMAL_FUSION } from '../tokens/p3p/normal-fusion-service-token';
import { P3P_TRIANGLE_FUSION } from '../tokens/p3p/triangle-fusion-service-token';
import { P3FES_COMPENDIUM } from '../tokens/p3fes/compendium-service-token';
import { P3FES_NORMAL_FUSION } from '../tokens/p3fes/normal-fusion-service-token';
import { P3FES_TRIANGLE_FUSION } from '../tokens/p3fes/triangle-fusion-service-token';
import { P4G_COMPENDIUM } from '../tokens/p4g/compendium-service-token';
import { P4G_NORMAL_FUSION } from '../tokens/p4g/normal-fusion-service-token';
import { P4G_TRIANGLE_FUSION } from '../tokens/p4g/triangle-fusion-service-token';

export const serviceToken: any = {
  p3p: {
    compendium: P3P_COMPENDIUM,
    normalFusion: P3P_NORMAL_FUSION,
    triangleFusion: P3P_TRIANGLE_FUSION,
  },
  p3fes: {
    compendium: P3FES_COMPENDIUM,
    normalFusion: P3FES_NORMAL_FUSION,
    triangleFusion: P3FES_TRIANGLE_FUSION,
  },
  p4g: {
    compendium: P4G_COMPENDIUM,
    normalFusion: P4G_NORMAL_FUSION,
    triangleFusion: P4G_TRIANGLE_FUSION,
  },
};
