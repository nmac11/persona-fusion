import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { p3pCompendiumProvider } from '../tokens/p3p/compendium-service-token';
import { p3fesCompendiumProvider } from '../tokens/p3fes/compendium-service-token';
import { p3ansCompendiumProvider } from '../tokens/p3ans/compendium-service-token';
import { p4gCompendiumProvider } from '../tokens/p4g/compendium-service-token';
import { p4CompendiumProvider } from '../tokens/p4/compendium-service-token';
import { p5CompendiumProvider } from '../tokens/p5/compendium-service-token';
import { p5rCompendiumProvider } from '../tokens/p5r/compendium-service-token';

import { p3pFusionChartProvider } from '../tokens/p3p/fusion-chart-service-token';
import { p3fesFusionChartProvider } from '../tokens/p3fes/fusion-chart-service-token';
import { p3ansFusionChartProvider } from '../tokens/p3ans/fusion-chart-service-token';
import { p4gFusionChartProvider } from '../tokens/p4g/fusion-chart-service-token';
import { p4FusionChartProvider } from '../tokens/p4/fusion-chart-service-token';
import { p5FusionChartProvider } from '../tokens/p5/fusion-chart-service-token';
import { p5rFusionChartProvider } from '../tokens/p5r/fusion-chart-service-token';

import { p3pSkillProvider } from '../tokens/p3p/skill-service-token';
import { p3fesSkillProvider } from '../tokens/p3fes/skill-service-token';
import { p3ansSkillProvider } from '../tokens/p3ans/skill-service-token';
import { p4SkillProvider } from '../tokens/p4/skill-service-token';
import { p5SkillProvider } from '../tokens/p5/skill-service-token';
import { p5rSkillProvider } from '../tokens/p5r/skill-service-token';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    p3pCompendiumProvider,
    p3fesCompendiumProvider,
    p3ansCompendiumProvider,
    p4gCompendiumProvider,
    p4CompendiumProvider,
    p5CompendiumProvider,
    p5rCompendiumProvider,
    p3pFusionChartProvider,
    p3fesFusionChartProvider,
    p3ansFusionChartProvider,
    p4gFusionChartProvider,
    p4FusionChartProvider,
    p5FusionChartProvider,
    p5rFusionChartProvider,
    p3pSkillProvider,
    p3fesSkillProvider,
    p3ansSkillProvider,
    p4SkillProvider,
    p5SkillProvider,
    p5rSkillProvider,
  ],
})
export class ProvidersModule {}
