/// <reference lib="webworker" />

import { calculateProbability } from '../helpers/probability-helper';

addEventListener('message', ({ data }) => {
  const { id, error, payload } = data;
  const probabilities = { 0: 0 };
  payload.ratios.forEach((ratio, index) => {
    const calculated = probabilities[ratio];
    let probability;
    if (calculated === undefined) {
      probabilities[ratio] = calculateProbability(
        payload.ratios,
        payload.picks,
        index,
      );
    }
  });

  postMessage({ id, error, payload: probabilities });
});
