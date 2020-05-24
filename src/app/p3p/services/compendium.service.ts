import compendium from '../data/p3p-compendium.json';
import { Persona } from '../models/persona';
import { exactMatchRegExp } from '../helpers/reg-exp-helpers';

export class CompendiumService {
  constructor() {}

  getAll(): Array<Persona> {
    return compendium;
  }

  find(name: string): Persona {
    const kwdRegex = exactMatchRegExp(name);
    return compendium.find((persona) => kwdRegex.test(persona.name));
  }
}
