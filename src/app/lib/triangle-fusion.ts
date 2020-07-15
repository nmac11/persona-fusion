import { Persona } from '../models/persona';
import { CompendiumService } from '../services/compendium.service';
import { FusionChartService } from '../services/fusion-chart.service';

export class TriangleFusion {
  fusionLevel: number;
  fusionArcana: number;

  constructor(
    private compendiumService: CompendiumService,
    private pA: Persona,
    private pB1: Persona,
    private pB2: Persona,
  ) {}

  fuseKnownArcana(arcana: number): Persona {
    this.fusionArcana = arcana;
    return this.fuse();
  }

  fuseUnknownArcana(fusionChartService: FusionChartService): Persona {
    this.fusionArcana = this.findTriangleFusionArcana(fusionChartService);
    if (this.fusionArcana === undefined) return;
    return this.fuse();
  }

  private fuse(): Persona {
    this.fusionLevel =
      Math.floor((this.pA.level + this.pB1.level + this.pB2.level) / 3) + 5;
    return this.compendiumService.findClosestOneRankHigher(
      this.fusionArcana,
      this.fusionLevel,
      this.pA,
      this.pB1,
      this.pB2,
    );
  }

  private findTriangleFusionArcana(
    fusionChartService: FusionChartService,
  ): number {
    const [aA, aB1, aB2] = [this.pA, this.pB1, this.pB2].map((p) => p.arcana);
    const aB = fusionChartService.findNormalFusionChartResult([aB1, aB2]);
    return fusionChartService.findTriangleFusionChartResult([aA, aB]);
  }
}
