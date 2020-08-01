import { modifiedPermutations } from './permutations-helper';

export function calculateProbability(
  ratios: number[],
  berths: number,
  index: number,
): number {
  if (ratios[index] === 0) return 0;
  const nonZeroRatios = ratios.filter(r => r > 0);
  const totalItems = nonZeroRatios.reduce((total, a) => total + a, 0);
  let netProbability = 0;
  for (let berth = 1; berth <= berths; berth++) {
    const scenarios = modifiedPermutations(
      [...Array(nonZeroRatios.length).keys()],
      index,
      berth,
    );
    netProbability += sumScenarioProbabilities(nonZeroRatios, scenarios, totalItems);
  }
  return netProbability;
}

function sumScenarioProbabilities(
  ratios: number[],
  scenarios: number[][],
  totalItems: number,
): number {
  return scenarios.reduce(
    (sum, scenario) => sum + scenarioProbability(ratios, scenario, totalItems),
    0,
  );
}

function scenarioProbability(
  ratios: number[],
  scenario: number[],
  totalItems: number,
): number {
  let total = totalItems;
  let prob = 1;
  for (let x = 0; x < scenario.length; x++) {
    const val = ratios[scenario[x]];
    prob = (prob * val) / total;
    total -= val;
  }
  return prob;
}
