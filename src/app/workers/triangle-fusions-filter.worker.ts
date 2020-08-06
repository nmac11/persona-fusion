import { exactMatchRegExp } from '../helpers/reg-exp-helpers';
import { Persona } from '../models/persona';

/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const { fusions, nameFilters, selected } = data;
  const response = fusions
    .filter(includesEverySelectedPersona(selected))
    .reduce(availablePersonaeReducer(selected), new Array<Persona>())
    .filter((p) => {
      return nameFilters.length
        ? nameFilters.some(
            (nf) =>
              exactMatchRegExp(nf).test(p.name) ||
              p.skills.some((s) => exactMatchRegExp(nf).test(s.name)),
          )
        : true;
    })
    .sort((a, b) => a.level - b.level);

  postMessage(response);
});

function includesEverySelectedPersona(
  selectedPersonae: Persona[],
): (fusion: Persona[]) => boolean {
  return (fusion) =>
    selectedPersonae.every((selectedPersona) =>
      fusion.some((p) => p.id === selectedPersona.id),
    );
}

function availablePersonaeReducer(
  selectedPersonae: Persona[],
): (results: Persona[], fusion: Persona[]) => Persona[] {
  return (results, fusion) => {
    const toAdd: Persona[] = fusion.filter(
      (fp) =>
        !results.some((p) => fp.id === p.id) &&
        !selectedPersonae.some((p) => fp.id === p.id),
    );
    results.push(...toAdd);
    return results;
  };
}
