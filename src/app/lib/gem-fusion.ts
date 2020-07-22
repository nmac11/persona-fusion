import { Persona } from '../models/persona';
import { CompendiumService } from '../services/compendium.service';
import { P5FusionChartService } from '../services/fusion-chart.service';

export class GemFusion {
  constructor(
    private compendiumService: CompendiumService,
    private fusionChartService: P5FusionChartService,
    private personae: Persona[],
    private fusibleLevel: number,
  ) {}

  fuse(): Persona {
    const gem = this.personae.find((p) => p.gem);
    const fusible = this.personae.find((p) => !p.gem);
    const offset = this.fusionChartService.getGemOffset(
      fusible.arcana,
      gem.name,
    );

    switch (offset) {
      case -2:
        return this.compendiumService.downgradeTwoRanks(
          fusible,
          this.fusibleLevel,
        );
      case -1:
        return this.compendiumService.downgradeOneRank(
          fusible,
          this.fusibleLevel,
        );
      case 1:
        return this.compendiumService.upgradeOneRank(
          fusible,
          this.fusibleLevel,
        );
      case 2:
        return this.compendiumService.upgradeTwoRanks(
          fusible,
          this.fusibleLevel,
        );
    }
  }
}
