import compendium from '../data/p3p-compendium.json';
import { Persona } from '../models/persona';
import { exactMatchRegExp } from '../helpers/reg-exp-helpers';

export class CompendiumService {
  constructor() {}

  getAll(arcana: number = null): Array<Persona> {
    return arcana ? compendium.filter((p) => p.arcana === arcana) : compendium;
  }

  find(name: string): Persona {
    const kwdRegex = exactMatchRegExp(name);
    return compendium.find((persona) => kwdRegex.test(persona.name));
  }
}
