import compendium from '../data/p3p-compendium.json';
import { Persona } from '../../models/persona';

export class CompendiumService {
  constructor() {}

  getAll(): Array<Persona> {
    return compendium;
  }
}
