import { calculateProbability } from '../helpers/probability-helper';
import { ProbabilityWorkerWrapper } from './probability-worker-wrapper';

export class Probabilities {
  nonZeroRatios: number[];
  uniqueRatios: { value: number; index: number }[];

  constructor(private ratios: number[], private picks: number) {
    this.nonZeroRatios = this.ratios.filter((r) => r !== 0);
    this.uniqueRatios = Array.from(new Set(this.nonZeroRatios)).reduce(
      (res, v) => {
        res.push({ value: v, index: this.nonZeroRatios.indexOf(v) });
        return res;
      },
      [],
    );
  }

  calculate(): Promise<{ [key: number]: number }> {
    if (this.nonZeroRatios.every((r) => r === this.nonZeroRatios[0]))
      return this.calculateEqualRatios();
    else if (this.picks > 5)
      return this.approximate();
    else return this.calculateVariableRatios();
  }

  private async approximate(): Promise<{ [key: number]: number }> {
    const netProbRatio = this.ratios.reduce((sum, ratio) => sum + ratio, 0);
    let probabilities = { 0: 0 };

    this.uniqueRatios.forEach(
      (u) =>
        (probabilities[u.value] = (u.value * this.picks) / netProbRatio || 0),
    );
    return probabilities;
  }

  private async calculateEqualRatios(): Promise<{ [key: number]: number }> {
    const netProbRatio = this.ratios.reduce((sum, ratio) => sum + ratio, 0);
    let probabilities = { 0: 0 };

    const ratio = this.nonZeroRatios[0];
    probabilities[ratio] = (ratio * this.picks) / netProbRatio || 0;
    return probabilities;
  }

  private async calculateVariableRatios(): Promise<{ [key: number]: number }> {
    const probabilitiesPromise = await Promise.all(
      this.uniqueRatios.map((u) =>
        new ProbabilityWorkerWrapper().calculate({
          ratios: this.nonZeroRatios,
          picks: this.picks,
          index: u.index,
        }),
      ),
    );

    return probabilitiesPromise.reduce(
      (res, probability, index) => {
        res[this.uniqueRatios[index].value] = probability;
        return res;
      },
      { 0: 0 },
    );
  }
}
