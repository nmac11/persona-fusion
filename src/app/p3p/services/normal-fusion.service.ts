import { Injectable } from '@angular/core';
import { ArcanaFusionService } from '../services/arcana-fusion.service';
import { CompendiumService } from '../services/compendium.service';
import { Persona } from '../models/persona';

@Injectable()
export class NormalFusionService {
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
    const arcanaFusions = this.arcanaFusionService.getPossibleNormalFusions(
      this.persona.arcana,
    );
    this.filterFusions(arcanaFusions);
  }

  private filterFusions(arcanaFusions: Persona[][][]): void {
    arcanaFusions.forEach(([arc1, arc2]) => {
      arc1.forEach((p1: Persona) =>
        arc2.forEach((p2: Persona) => {
          if (this.testFusion(p1, p2)) this.addToList(p1, p2);
        }),
      );
    });
  }

  private testFusion(p1: Persona, p2: Persona): boolean {
    if (!this.validateUniqueness(p1, p2)) return false;
    const fusionLevel = Math.floor((p1.level + p2.level) / 2 + 1);
    return (
      this.testFusionSameArcana(p1, p2, fusionLevel) ||
      this.testFusionDifferentArcana(p1, p2, fusionLevel)
    );
  }

  private addToList(p1: Persona, p2: Persona): void {
    if (this.notYetListed(p1, p2)) this.list.push([p1, p2]);
  }

  private notYetListed(p1: Persona, p2: Persona): boolean {
    return !this.list.some(
      ([a, b]) =>
        (a.id === p1.id && b.id === p2.id) ||
        (b.id === p1.id && a.id === p2.id),
    );
  }

  private validateUniqueness(p1: Persona, p2: Persona) {
    return !(
      p1.id === p2.id ||
      p1.id === this.persona.id ||
      p2.id === this.persona.id
    );
  }

  private testFusionSameArcana(p1: Persona, p2: Persona, fusionLevel: number) {
    if (p1.arcana !== p2.arcana) return false;
    let result = this.getPreviousRank(p1, p2, fusionLevel);
    return result?.id === this.persona.id;
  }

  private testFusionDifferentArcana(
    p1: Persona,
    p2: Persona,
    fusionLevel: number,
  ) {
    const result = this.compendiumService.getNextRankFromLevel(
      this.persona.arcana,
      fusionLevel,
    );
    return result.id === this.persona.id;
  }

  private getPreviousRank(p1: Persona, p2: Persona, fusionLevel: number) {
    let result = this.compendiumService.getPreviousRankFromLevel(
      this.persona.arcana,
      fusionLevel,
    );
    while (result?.id === p1.id || result?.id === p2.id)
      result = this.compendiumService.getPreviousRank(result);
    return result;
  }
}
