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
