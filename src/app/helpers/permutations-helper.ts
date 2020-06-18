export function permutations(
  array: any[],
  depth: number,
  result: any[][] = null,
): any[][] {
  if (!result) result = array.map((a) => [a]);
  if (depth < 2) return result;
  const newRes = result.reduce((all, r) => {
    array.forEach((a) => {
      if (!r.includes(a)) all.push([...r, a]);
    });
    return all;
  }, []);
  return permutations(array, depth - 1, newRes);
}

export function modifiedPermutations(array, index, depth, result = null) {
  if (depth === 1) return [[index]];
  result = result || array.filter((i) => i !== index).map((a) => [a]);
  if (depth <= 2) return result.map((r) => [...r, index]);
  const newRes = result.reduce((all, r) => {
    array
      .filter((i) => i !== index)
      .forEach((a) => {
        if (!r.includes(a)) all.push([...r, a]);
      });

    return all;
  }, []);
  return modifiedPermutations(array, index, depth - 1, newRes);
}
