import normalFusionChart from '../../data/p3/p3-normal-fusion-chart.json';
import triangleFusionChart from '../../data/p3/p3-triangle-fusion-chart.json';

export function getTriangleFormulas(arcana: number) {
  return triangleFusionChart[arcana].reduce(triangleFormulaReducer, []);
}

function triangleFormulaReducer(
  formulas: number[][],
  [triangle1, triangle2]: number[],
) {
  const mappedFormulas = [
    ...normalFusionChart[triangle1].map((normalFormula: number[]) => [
      triangle2,
      ...normalFormula,
    ]),
    ...normalFusionChart[triangle2].map((normalFormula: number[]) => [
      triangle1,
      ...normalFormula,
    ]),
  ];
  addUniqueFormula(formulas, mappedFormulas);
  return formulas;
}

function addUniqueFormula(formulas: number[][], newFormulas: number[][]) {
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
