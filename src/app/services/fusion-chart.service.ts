import { Injectable, Inject } from '@angular/core';
import { CompendiumService } from '../services/compendium.service';
import { Persona } from '../models/persona';
import { SpecialFusions } from '../models/special-fusions';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';
import { GameConfig } from '../models/game-config';

export abstract class FusionChartService {
  protected specialFusionChart: SpecialFusions;
  protected normalFusionChart: number[][][];

  constructor(
    @Inject(GAME_CONFIG) protected config: GameConfig,
    protected compendiumService: CompendiumService,
  ) {
    this.specialFusionChart = config.specialFusionChart;
    this.normalFusionChart = config.normalFusionChart;
  }

  getPossibleNormalFusions(arcana: number): Persona[][][] {
    const formulas = this.normalFusionChart[arcana];
    return this.mapFormulasToPersonae(formulas, arcana);
  }

  getSpecialFusions(persona: Persona): Persona[] {
    const specialFusion = this.specialFusionChart[persona.name];
    return specialFusion
      ? specialFusion.map((name) => this.compendiumService.find(name))
      : [];
  }

  trySpecialFusion(personae: Persona[]): Persona {
    const personaNames = personae.map((p) => p.name);
    return Object.entries(this.specialFusionChart).reduce(
      (res: Persona, [resultName, req]: [string, string[]]) => {
        if (
          req.length === personae.length &&
          personaNames.every((name) => req.includes(name))
        )
          return this.compendiumService.find(resultName);
        return res;
      },
      null,
    );
  }

  findNormalFusionChartResult(fusionArcana: number[]): number {
    return this.findFusionChartResult(this.normalFusionChart, fusionArcana);
  }

  protected findFusionChartResult(fusionChart, [a1, a2]: number[]): number {
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

  protected mapFormulasToPersonae(
    formulas: number[][],
    arcana: number,
  ): Persona[][][] {
    return formulas.map((arcanaFusion: number[]) =>
      arcanaFusion.map((a: number) => this.compendiumService.getAll(a)),
    );
  }
}

@Injectable()
export class P3P4FusionChartService extends FusionChartService {
  private triangleFusionChart: number[][][];

  constructor(
    @Inject(GAME_CONFIG) protected config: GameConfig,
    protected compendiumService: CompendiumService,
  ) {
    super(config, compendiumService);
    this.triangleFusionChart = this.config.triangleFusionChart;
  }

  getPossibleTriangleFusions(arcana: number): Persona[][][] {
    const formulas = this.getTriangleFormulas(arcana);
    return this.mapFormulasToPersonae(formulas, arcana);
  }

  findTriangleFusionChartResult(fusionArcana: number[]): number {
    return this.findFusionChartResult(this.triangleFusionChart, fusionArcana);
  }

  private getTriangleFormulas(arcana: number): number[][] {
    return this.triangleFusionChart[arcana].reduce(
      this.triangleFormulaReducer,
      [],
    );
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
}

@Injectable()
export class P5FusionChartService extends FusionChartService {
  private gemFusionChart: { [key: string]: number[] };

  constructor(
    @Inject(GAME_CONFIG) protected config: GameConfig,
    protected compendiumService: CompendiumService,
  ) {
    super(config, compendiumService);
    this.gemFusionChart = this.config.gemFusionChart;
  }

  getGemFormulas(arcana: number): any {
    return Object.entries(this.gemFusionChart).reduce((res, [gem, effect]) => {
      const group = (res[effect[arcana]] = res[effect[arcana]] || []);
      group.push(gem);
      return res;
    }, {});
  }

  getGemOffset(arcana: number, gemName: string): number {
    return this.gemFusionChart[gemName][arcana];
  }
}
