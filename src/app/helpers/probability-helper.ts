export function calculateProbability(
  ratios: number[],
  picks: number,
  index: number,
) {
  const ratiosDup = ratios.slice(0);
  const ratio = ratiosDup.splice(index, 1)[0];
  const ratiosTotal = sum(ratios);
  return calculateNetProbability(ratio, ratiosDup, ratiosTotal, picks - 1);
}

function sum(addends: number[]): number {
  return addends.reduce((total, a) => total + a, 0);
}

function calculateScenarioProbability(
  ratios: number[],
  ratiosTotal: number,
): number {
  let total = ratiosTotal;
  return ratios.reduce((res, a) => {
    if (!a || !res) return 0;
    const scenarioProbabilty = (res * a) / total;
    total -= a;
    return scenarioProbabilty;
  }, 1);
}

function calculateNetProbability(
  ratio: number,
  ratios: number[],
  ratiosTotal: number,
  picks: number,
  runningTotal: number = 0,
  combo: number[] = [],
) {
  runningTotal += calculateScenarioProbability([...combo, ratio], ratiosTotal);
  if (picks < 1) {
    return runningTotal;
  } else if (picks === 1) {
    return ratios.reduce(
      (total, r) =>
        calculateScenarioProbability([...combo, r, ratio], ratiosTotal) + total,
      runningTotal,
    );
  }
  return ratios.reduce((total, r, i) => {
    const nextRatios = ratios.slice();
    nextRatios.splice(i, 1);
    let nextCombo = combo.length ? combo.slice() : [];
    nextCombo.push(r);
    return calculateNetProbability(
      ratio,
      nextRatios,
      ratiosTotal,
      picks - 1,
      total,
      nextCombo.slice(),
    );
  }, runningTotal);
}
