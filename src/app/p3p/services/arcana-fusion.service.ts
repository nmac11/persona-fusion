import { Injectable } from '@angular/core';
import normalFusionChart from '../data/p3p-normal-fusion-chart.json';
import { CompendiumService } from '../services/compendium.service';
import { Persona } from '../models/persona';

@Injectable()
export class ArcanaFusionService {
  constructor(private compendiumService: CompendiumService) {}

  getPossibleFusions(arcana: number): Array<Array<Array<Persona>>> {
    const formulas = normalFusionChart[arcana];
    return formulas.map((arcanaFusion) =>
      arcanaFusion.map((arcana) => this.compendiumService.getAll(arcana)),
    );
  }
}
