import { Injectable, Inject } from '@angular/core';
import { CompendiumService } from '../services/compendium.service';
import { Persona } from '../models/persona';

@Injectable()
export class FusionChartService {
  constructor(
    @Inject(CompendiumService) private compendiumService: CompendiumService,
    @Inject(Object) private normalFusionChart: any,
    @Inject(Object) private triangleFusionChart: any,
    @Inject(Object) private specialFusions: any,
  ) {}

  getPossibleNormalFusions(arcana: number): Persona[][][] {
    const formulas = this.normalFusionChart[arcana];
    return this.mapFormulasToPersonae(formulas, arcana);
  }

  getPossibleTriangleFusions(arcana: number): Persona[][][] {
    const formulas = this.getTriangleFormulas(arcana);
    return this.mapFormulasToPersonae(formulas, arcana);
  }

  getSpecialFusions(persona: Persona): Persona[] {
    return this.specialFusions
      .find((sf) => sf.persona === persona.name)
      .requirements.map((name) => this.compendiumService.find(name));
  }

  private mapFormulasToPersonae(
    formulas: number[][],
    arcana: number,
  ): Persona[][][] {
    return formulas.map((arcanaFusion: number[]) =>
      arcanaFusion.map((a: number) => this.compendiumService.getAll(a)),
    );
  }

  private getTriangleFormulas(arcana: number): number[][] {
    return this.triangleFusionChart[arcana].reduce(
      this.triangleFormulaReducer,
      [],
    );
  }

  private addUniqueFormula(formulas: number[][], newFormulas: number[][]) {
    newFormulas.forEach((newFormula) => {
      if (
        !formulas.some((formulaFromList) => {
          for (let x = 0; x < 3; x++)
            if (formulaFromList[x] !== newFormula[x]) return false;
          return true;
        })
      )
        formulas.push(newFormula);
    });
  }

  private triangleFormulaReducer: Function = (
    formulas: number[][],
    [triangle1, triangle2]: number[],
  ) => {
    const mappedFormulas = [
      ...this.normalFusionChart[triangle1].map((normalFormula: number[]) => [
        triangle2,
        ...normalFormula,
      ]),
      ...this.normalFusionChart[triangle2].map((normalFormula: number[]) => [
        triangle1,
        ...normalFormula,
      ]),
    ];
    this.addUniqueFormula(formulas, mappedFormulas);
    return formulas;
  };
}
