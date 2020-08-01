import { calculateProbability } from '../helpers/probability-helper';
import { ProbabilityWorkerWrapper } from './probability-worker-wrapper';

export class Probabilities {
  nonZeroRatios: number[];

  constructor(private ratios: number[], private picks: number) {
    this.nonZeroRatios = this.ratios.filter((r) => r !== 0);
  }

  calculate(): Promise<{ [key: number]: number }> {
    if (this.nonZeroRatios.every((r) => r === this.nonZeroRatios[0]))
      return this.calculateEqualRatios();
    else return this.calculateVariableRatios();
  }

  private async calculateEqualRatios(): Promise<{ [key: number]: number }> {
    const netProbRatio = this.ratios.reduce((sum, ratio) => sum + ratio, 0);
    let probabilities = { 0: 0 };

    const ratio = this.nonZeroRatios[0];
    probabilities[ratio] = (ratio * this.picks) / netProbRatio || 0;
    return probabilities;
  }

  private async calculateVariableRatios(): Promise<{ [key: number]: number }> {
    const uniqueRatios = Array.from(new Set(this.nonZeroRatios)).reduce((res, v) => {
      res.push({ value: v, index: this.nonZeroRatios.indexOf(v) });
      return res;
    }, []);

    const probabilitiesPromise = await Promise.all(
      uniqueRatios.map((u) =>
        new ProbabilityWorkerWrapper().calculate({
          ratios: this.nonZeroRatios,
          picks: this.picks,
          index: u.index,
        }),
      ),
    );

    return probabilitiesPromise.reduce(
      (res, probability, index) => {
        res[uniqueRatios[index].value] = probability;
        return res;
      },
      { 0: 0 },
    );
  }
}
