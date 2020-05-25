import { Injectable } from '@angular/core';
import compendium from '../data/p3p-compendium.json';
import { Persona } from '../models/persona';
import { exactMatchRegExp } from '../helpers/reg-exp-helpers';

@Injectable()
export class CompendiumService {
  constructor() {}

  getAll(arcana: number = null): Array<Persona> {
    return arcana !== null
      ? compendium.filter((p) => p.arcana === arcana)
      : compendium;
  }

  find(name: string): Persona {
    const kwdRegex = exactMatchRegExp(name);
    return compendium.find((persona) => kwdRegex.test(persona.name));
  }

  findById(id: number): Persona {
    return compendium.find((persona) => persona.id === id);
  }

  getNextRankFromLevel(arcana: number, level: number): Persona {
    return (
      compendium
        .filter((persona: Persona) => {
          return (
            !persona.special &&
            persona.level >= level &&
            persona.arcana === arcana
          );
        })
        .reduce((min, p) => {
          min = min || p;
          return min.level > p.level ? p : min;
        }, null) || this.getHighestRank(arcana)
    );
  }

  getPreviousRankFromLevel(arcana: number, level: number): Persona {
    return (
      compendium
        .filter((persona: Persona) => {
          return (
            !persona.special &&
            persona.level <= level &&
            persona.arcana === arcana
          );
        })
        .reduce((max, p) => {
          max = max || p;
          return max.level < p.level ? p : max;
        }, null) || this.getLowestRank(arcana)
    );
  }

  getHighestRank(arcana: number): Persona {
    return this.getAll(arcana)
      .filter((p: Persona) => !p.special)
      .reduce((max: Persona, p: Persona) => {
        max = max || p;
        return max.level < p.level ? p : max;
      }, null);
  }

  getLowestRank(arcana: number): Persona {
    return this.getAll(arcana)
      .filter((p: Persona) => !p.special)
      .reduce((min: Persona, p: Persona) => {
        min = min || p;
        return min.level > p.level ? p : min;
      }, null);
  }

  getNextRank(current: Persona): Persona {
    return compendium
      .filter((persona: Persona) => {
        return (
          !persona.special &&
          persona.level > current.level &&
          persona.arcana === current.arcana
        );
      })
      .reduce((min: Persona, p: Persona) => {
        min = min || p;
        return min.level > p.level ? p : min;
      }, null);
  }

  getPreviousRank(current: Persona): Persona {
    return compendium
      .filter((persona: Persona) => {
        return (
          !persona.special &&
          persona.level < current.level &&
          persona.arcana === current.arcana
        );
      })
      .reduce((max: Persona, p: Persona) => {
        max = max || p;
        return max.level < p.level ? p : max;
      }, null);
  }
}
