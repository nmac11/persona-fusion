import { Injectable, Inject } from '@angular/core';
import { FusionChartService } from '../services/fusion-chart.service';
import { CompendiumService } from '../services/compendium.service';
import { NormalFusion } from '../lib/normal-fusion';
import { Persona } from '../models/persona';

@Injectable()
export class NormalFusionService {
  private persona: Persona;
  list: Persona[][] = [];
  fusionPersonaIds: Set<number> = new Set();

  constructor(
    @Inject(FusionChartService) private arcanaFusionService: FusionChartService,
    @Inject(CompendiumService) private compendiumService: CompendiumService,
  ) {}

  findFusions(persona: Persona): Persona[][] {
    this.persona = persona;
    this.list = [];
    if (persona) this.generateFusionList();
    return this.list;
  }

  fusionPersonae(): Persona[] {
    return Array.from(this.fusionPersonaIds).map((id) =>
      this.compendiumService.findById(id),
    );
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
          if (this.validate(p1, p2) && this.testFusion(p1, p2))
            this.addToList([p1, p2]);
        }),
      );
    });
  }

  private addToList(personae: Persona[]): void {
    personae.forEach((persona: Persona) =>
      this.fusionPersonaIds.add(persona.id),
    );
    this.list.push(personae);
  }

  private testFusion(p1: Persona, p2: Persona): boolean {
    const result = new NormalFusion(
      this.compendiumService,
      p1,
      p2,
    ).fuseKnownArcana(this.persona.arcana);
    return result?.id === this.persona.id;
  }

  private validate(p1: Persona, p2: Persona): boolean {
    return (
      this.validateLevels(p1, p2) &&
      this.validateUniqueness(p1, p2) &&
      this.validateNotGemFusion(p1, p2)
    );
  }

  private validateLevels(p1: Persona, p2: Persona): boolean {
    return !(p1.level < p2.level && p1.arcana === p2.arcana);
  }

  private validateNotGemFusion(p1: Persona, p2: Persona): boolean {
    return (!p1.gem && !p2.gem) || (p1.gem && p2.gem);
  }

  private validateUniqueness(p1: Persona, p2: Persona): boolean {
    return !(
      p1.id === p2.id ||
      p1.id === this.persona.id ||
      p2.id === this.persona.id
    );
  }
}
