import { Injectable, Inject } from '@angular/core';
import { FusionChartService } from '../services/fusion-chart.service';
import { CompendiumService } from '../services/compendium.service';
import { Persona } from '../models/persona';
import { TriangleFusion } from '../lib/triangle-fusion';

@Injectable()
export class TriangleFusionService {
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
            if (this.validate(p1, p2, p3) && this.testFusion(p1, p2, p3))
              this.addToList([p1, p2, p3]);
          }),
        ),
      );
    });
  }

  private addToList(personae: Persona[]): void {
    personae.forEach((persona: Persona) =>
      this.fusionPersonaIds.add(persona.id),
    );
    this.list.push(personae);
  }

  private testFusion(p1: Persona, p2: Persona, p3: Persona): boolean {
    const result = new TriangleFusion(
      this.compendiumService,
      p1,
      p2,
      p3,
    ).fuseKnownArcana(this.persona.arcana);
    return result?.id === this.persona.id;
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
}
