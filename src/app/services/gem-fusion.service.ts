import { Injectable, Inject } from '@angular/core';
import { P5FusionChartService } from './fusion-chart.service';
import { CompendiumService } from './compendium.service';
import { Persona } from '../models/persona';

@Injectable()
export class GemFusionService {
  constructor(
    @Inject(P5FusionChartService)
    private arcanaFusionService: P5FusionChartService,
    @Inject(CompendiumService) private compendiumService: CompendiumService,
  ) {}

  findFusions(
    persona: Persona,
  ): {
    offset: number;
    gem: Persona;
    personae: { persona: Persona; levelRange: number[] }[];
  }[] {
    return Object.entries(
      this.arcanaFusionService.getGemFormulas(persona.arcana),
    )
      .sort((a, b) => +b[0] - +a[0])
      .reduce((res, [offset, gemNames]) => {
        const group = {
          offset,
          personae: this.findGemFusibles(persona, +offset),
        };
        const gems = (gemNames as string[]).map((name) =>
          this.compendiumService.find(name),
        );
        if (group.personae.length) {
          gems.forEach((gem) => res.push({ gem, ...group }));
        }
        return res;
      }, []);
  }

  private findGemFusibles(
    persona: Persona,
    offset: number,
  ): { persona: Persona; levelRange: number[] }[] {
    let personae;
    switch (offset) {
      case 1:
        personae = this.gemFusiblesPlus1(persona);
        break;
      case 2:
        personae = this.gemFusiblesPlus2(persona);
        break;
      case -1:
        personae = this.gemFusiblesMinus1(persona);
        break;
      case -2:
        personae = this.gemFusiblesMinus2(persona);
    }
    return personae.map((p) => {
      const levelRange = this.calculateLevelRange(persona, p, offset);
      return { persona: p, levelRange };
    });
  }

  private calculateLevelRange(target, fusible, offset): number[] {
    const arcanaFamily = this.compendiumService
      .getAllWithRestrictions(fusible.arcana)
      .filter((p) => p.id !== fusible.id);
    const targetIndex = arcanaFamily.findIndex((p) => p.id === target.id);
    let range;
    if (offset === 1) {
      range = [
        arcanaFamily[targetIndex - 1]?.level || fusible.level,
        target.level - 1,
      ];
    } else if (offset === 2) {
      range = [
        arcanaFamily[targetIndex - 2]?.level || fusible.level,
        arcanaFamily[targetIndex - 1]?.level - 1,
      ];
    } else if (offset === -1) {
      range = [target.level + 1, arcanaFamily[targetIndex + 1]?.level || 99];
    } else if (offset === -2) {
      range = [
        arcanaFamily[targetIndex + 1]?.level + 1,
        arcanaFamily[targetIndex + 2]?.level || 99,
      ];
    }
    range[0] = Math.max(range[0], fusible.level);
    return range;
  }

  private gemFusibles(
    persona: Persona,
    fn: (p: Persona) => boolean,
  ): Persona[] {
    return this.compendiumService
      .getAll(persona.arcana)
      .filter((p) => p.id !== persona.id && !p.gem && fn(p));
  }

  private gemFusiblesPlus1(persona: Persona): Persona[] {
    return this.gemFusibles(persona, (p) => p.level < persona.level);
  }

  private gemFusiblesPlus2(persona: Persona): Persona[] {
    return this.gemFusibles(
      persona,
      (p) => p.level < this.compendiumService.downgradeOneRank(persona)?.level,
    );
  }

  private gemFusiblesMinus1(persona: Persona): Persona[] {
    return this.gemFusibles(persona, (p) => {
      const levelLimit = this.compendiumService.upgradeOneRank(persona)?.level;
      if (!levelLimit) return true;
      return p.level <= levelLimit;
    });
  }

  private gemFusiblesMinus2(persona: Persona): Persona[] {
    return this.gemFusibles(persona, (p) => {
      let levelLimit = this.compendiumService.upgradeTwoRanks(persona)?.level;
      const upgrade = this.compendiumService.upgradeOneRank(persona);
      if (!levelLimit && upgrade && upgrade.id !== p.id) levelLimit = 99;
      return p.level <= levelLimit;
    });
  }
}
