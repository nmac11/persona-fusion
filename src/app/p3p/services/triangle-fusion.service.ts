import { Injectable } from '@angular/core';
import { ArcanaFusionService } from '../services/arcana-fusion.service';
import { CompendiumService } from '../services/compendium.service';
import { Persona } from '../models/persona';

@Injectable()
export class TriangleFusionService {
  private persona: Persona;
  list: Persona[][] = [];

  constructor(
    private arcanaFusionService: ArcanaFusionService,
    private compendiumService: CompendiumService,
  ) {}

  findFusions(persona: Persona): Persona[][] {
    this.persona = persona;
    this.list = [];
    if (persona) this.generateFusionList();
    return this.list;
  }

  private generateFusionList(): void {
    const arcanaFusions = this.arcanaFusionService.getPossibleTriangleFusions(
      this.persona.arcana,
    );
    this.filterFusions(arcanaFusions);
  }

  private filterFusions(arcanaFusions: Persona[][][]): void {
    arcanaFusions.forEach(([arc1, arc2, arc3]: Persona[][]) => {
      arc1.forEach((p1) =>
        arc2.forEach((p2) =>
          arc3.forEach((p3) => {
            if (this.testFusion(p1, p2, p3)) this.list.push([p1, p2, p3]);
          }),
        ),
      );
    });
  }

  private testFusion(p1: Persona, p2: Persona, p3: Persona): boolean {
    if (!this.validate(p1, p2, p3)) return false;
    const fusionLevel = Math.floor((p1.level + p2.level + p3.level) / 3 + 5);
    let result = this.getNextRank(fusionLevel, p1, p2, p3);
    return this.persona.id === result?.id;
  }

  private validate(p1: Persona, p2: Persona, p3: Persona) {
    return (
      this.validateUniqueness(p1, p2, p3) && this.validateLevels(p1, p2, p3)
    );
  }

  private validateLevels(p1: Persona, p2: Persona, p3: Persona) {
    return !(
      p1.level < p3.level ||
      p1.level < p2.level ||
      (p1.level === p3.level && p1.arcana > p3.arcana) ||
      (p1.level === p2.level && p1.arcana > p2.arcana) ||
      (p3.level < p2.level && p2.arcana === p3.arcana)
    );
  }

  private validateUniqueness(p1: Persona, p2: Persona, p3: Persona) {
    return p1.id !== p2.id && p1.id !== p3.id && p2.id !== p3.id;
  }

  private getNextRank(
    fusionLevel: number,
    p1: Persona,
    p2: Persona,
    p3: Persona,
  ) {
    let result = this.compendiumService.getNextRankFromLevel(
      this.persona.arcana,
      fusionLevel,
    );
    while (
      result?.id === p1.id ||
      result?.id === p2.id ||
      result?.id === p3.id
    ) {
      result = this.compendiumService.getNextRank(result);
    }
    return result;
  }
}
