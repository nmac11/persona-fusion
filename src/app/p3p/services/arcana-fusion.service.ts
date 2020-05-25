import { Injectable } from '@angular/core';
import normalFusionChart from '../data/p3p-normal-fusion-chart.json';
import triangleFusionChart from '../data/p3p-triangle-fusion-chart.json';
import { CompendiumService } from '../services/compendium.service';
import { Persona } from '../models/persona';
import { getTriangleFormulas } from '../helpers/arcana-fusion-helper';

@Injectable()
export class ArcanaFusionService {
  constructor(private compendiumService: CompendiumService) {}

  getPossibleNormalFusions(arcana: number): Persona[][][] {
    const formulas = normalFusionChart[arcana];
    return this.mapFormulasToPersonae(formulas, arcana);
  }

  getPossibleTriangleFusions(arcana: number): Persona[][][] {
    const formulas = getTriangleFormulas(arcana);
    return this.mapFormulasToPersonae(formulas, arcana);
  }

  private mapFormulasToPersonae(
    formulas: number[][],
    arcana: number,
  ): Persona[][][] {
    return formulas.map((arcanaFusion: number[]) =>
      arcanaFusion.map((a: number) => this.compendiumService.getAll(a)),
    );
  }
}
