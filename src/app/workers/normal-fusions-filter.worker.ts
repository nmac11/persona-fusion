import { exactMatchRegExp } from '../helpers/reg-exp-helpers';
import { Persona } from '../models/persona';

/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const { fusions, fusionPersonae, nameFilters } = data;
  let response: Persona[][];

  if (!nameFilters.length) response = fusions;
  else {
    const filteredIds = fusionPersonae.reduce((res, p) => {
      if (
        nameFilters.some(
          (filterName) =>
            exactMatchRegExp(filterName).test(p.name) ||
            p.skills.some((s) => exactMatchRegExp(filterName).test(s.name)),
        )
      )
        res.push(p.id);
      return res;
    }, []);

    response = fusions.filter((pair) =>
      pair.some((persona) => filteredIds.includes(persona.id)),
    );
  }

  postMessage(response);
});
