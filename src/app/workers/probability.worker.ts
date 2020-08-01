/// <reference lib="webworker" />

import { calculateProbability } from '../helpers/probability-helper';

addEventListener('message', ({ data }) => {
  const { id, error, payload } = data;

  let probability = calculateProbability(
    payload.ratios,
    payload.picks,
    payload.index,
  );

  postMessage({ id, error, payload: probability });
});
