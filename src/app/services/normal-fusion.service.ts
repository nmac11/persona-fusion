import { Injectable, Inject } from '@angular/core';
import { FusionChartService } from '../services/fusion-chart.service';
import { CompendiumService } from '../services/compendium.service';
import { NormalFusion } from '../lib/normal-fusion';
import { Persona } from '../models/persona';
import { Observable, Subject } from 'rxjs';
import { NormalFusionsFilterWorkerWrapper } from '../lib/normal-fusions-filter-worker-wrapper';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class NormalFusionService {
  private persona: Persona;
  list: Persona[][] = [];
  fusionPersonaIds: Set<number> = new Set();
  filterWorkerWrapper: NormalFusionsFilterWorkerWrapper;
  filters$ = new Subject<string[]>();
  filteredFusions$ = new Observable<Persona[][]>();

  constructor(
    private fusionChartService: FusionChartService,
    private compendiumService: CompendiumService,
  ) {
    this.filteredFusions$ = this.filters$.pipe(
      switchMap((filters) => this.filterWorkerWrapper.filter(filters)),
    );
  }

  findFusions(persona: Persona): void {
    this.persona = persona;
    this.list = [];
    if (persona) this.generateFusionList();
    this.filterWorkerWrapper = new NormalFusionsFilterWorkerWrapper(
      this.list,
      this.fusionPersonae(),
    );
    this.filters$.next([]);
  }

  fusionPersonae(): Persona[] {
    return Array.from(this.fusionPersonaIds).map((id) =>
      this.compendiumService.findById(id),
    );
  }

  filter(nameFilters: string[]): void {
    this.filters$.next(nameFilters);
  }

  private generateFusionList(): void {
    const arcanaFusions = this.fusionChartService.getPossibleNormalFusions(
      this.persona.arcana,
    );
    this.testFusions(arcanaFusions);
  }

  private testFusions(arcanaFusions: Persona[][][]): void {
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
