import { Injectable, Inject } from '@angular/core';
import { CompendiumService } from '../services/compendium.service';
import { Persona } from '../models/persona';

interface SpecialFusion {
  persona: string;
  requirements: string[];
}

@Injectable()
export class FusionChartService {
  constructor(
    @Inject(CompendiumService) private compendiumService: CompendiumService,
    @Inject(Object) private normalFusionChart: number[][][],
    @Inject(Object) private triangleFusionChart: number[][][],
    @Inject(Object) private specialFusions: SpecialFusion[],
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

  trySpecialFusion(personae: Persona[]): Persona {
    const personaNames = personae.map((p) => p.name);
    const fusionResult = this.specialFusions.find(
      (sf) =>
        sf.requirements.length === personae.length &&
        personaNames.every((name) => sf.requirements.includes(name)),
    );
    return fusionResult
      ? this.compendiumService.find(fusionResult.persona)
      : null;
  }

  findNormalFusionChartResult(fusionArcana: number[]): number {
    return this.findFusionChartResult(this.normalFusionChart, fusionArcana);
  }

  findTriangleFusionChartResult(fusionArcana: number[]): number {
    return this.findFusionChartResult(this.triangleFusionChart, fusionArcana);
  }

  private findFusionChartResult(fusionChart, [a1, a2]: number[]): number {
    for (let i = 0; i < fusionChart.length; i++) {
      if (
        fusionChart[i].some(
          ([fa1, fa2]) =>
            (fa1 === a1 && fa2 === a2) || (fa2 === a1 && fa1 === a2),
        )
      ) {
        return i;
      }
    }
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

  private triangleFormulaReducer: (
    formulas: number[][],
    triangleFormulas: number[],
  ) => number[][] = (formulas, [triangle1, triangle2]) => {
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
