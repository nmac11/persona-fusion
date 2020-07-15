import { Persona } from '../models/persona';
import { CompendiumService } from '../services/compendium.service';
import { FusionChartService } from '../services/fusion-chart.service';

export class NormalFusion {
  fusionLevel: number;
  fusionArcana: number;

  constructor(
    private compendiumService: CompendiumService,
    private p1: Persona,
    private p2: Persona,
  ) {}

  fuseKnownArcana(arcana: number): Persona {
    this.fusionArcana = arcana;
    return this.fuse();
  }

  fuseUnknownArcana(fusionChartService: FusionChartService): Persona {
    this.fusionArcana = fusionChartService.findNormalFusionChartResult([
      this.p1.arcana,
      this.p2.arcana,
    ]);
    if (this.fusionArcana === undefined) return;
    return this.fuse();
  }

  private fuse(): Persona {
    this.fusionLevel = Math.floor((this.p1.level + this.p2.level) / 2 + 1);
    return this.p1.arcana === this.p2.arcana
      ? this.sameArcanaFusion()
      : this.differentArcanaFusion();
  }

  private sameArcanaFusion(): Persona {
    return this.compendiumService.findClosestOneRankLower(
      this.fusionArcana,
      this.fusionLevel,
      this.p1,
      this.p2,
    );
  }

  private differentArcanaFusion(): Persona {
    return this.compendiumService.getNextRankFromLevel(
      this.fusionArcana,
      this.fusionLevel,
    );
  }
}
