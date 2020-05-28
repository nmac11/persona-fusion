import { Injectable, Inject } from '@angular/core';
import { Persona } from '../models/persona';
import { exactMatchRegExp } from '../helpers/reg-exp-helpers';

@Injectable()
export class CompendiumService {
  private arcanaGroups: Persona[][];

  constructor(
    @Inject(Array) private compendium: Array<Persona>,
    @Inject(Array) private arcanaChart: Array<string>,
  ) {
    this.buildArcanaGroups();
  }

  private buildArcanaGroups(): void {
    this.arcanaGroups = this.compendium.reduce((groups, p) => {
      const arcana = p.arcana;
      groups[arcana] = groups[arcana] || [];
      groups[arcana].push(p);
      return groups;
    }, []);
  }

  arcanaName(arcana: number): string {
    return this.arcanaChart[arcana] || 'Unknown';
  }

  getAll(arcana: number = null): Array<Persona> {
    return arcana !== null ? this.arcanaGroups[arcana] : this.compendium;
  }

  find(name: string): Persona {
    const kwdRegex = exactMatchRegExp(name);
    return this.compendium.find((persona) => kwdRegex.test(persona.name));
  }

  findById(id: number): Persona {
    return this.compendium.find((persona) => persona.id === id);
  }

  getNextRankFromLevel(arcana: number, level: number): Persona {
    return (
      this.arcanaGroups[arcana]
        .filter((persona: Persona) => {
          return !persona.special && persona.level >= level;
        })
        .reduce((min, p) => {
          min = min || p;
          return min.level > p.level ? p : min;
        }, null) || this.getHighestRank(arcana)
    );
  }

  getPreviousRankFromLevel(arcana: number, level: number): Persona {
    return (
      this.arcanaGroups[arcana]
        .filter((persona: Persona) => {
          return !persona.special && persona.level <= level;
        })
        .reduce((max, p) => {
          max = max || p;
          return max.level < p.level ? p : max;
        }, null) || this.getLowestRank(arcana)
    );
  }

  getHighestRank(arcana: number): Persona {
    return this.arcanaGroups[arcana]
      .filter((p: Persona) => !p.special)
      .reduce((max: Persona, p: Persona) => {
        max = max || p;
        return max.level < p.level ? p : max;
      }, null);
  }

  getLowestRank(arcana: number): Persona {
    return this.arcanaGroups[arcana]
      .filter((p: Persona) => !p.special)
      .reduce((min: Persona, p: Persona) => {
        min = min || p;
        return min.level > p.level ? p : min;
      }, null);
  }

  getNextRank(current: Persona): Persona {
    return this.arcanaGroups[current.arcana]
      .filter((persona: Persona) => {
        return !persona.special && persona.level > current.level;
      })
      .reduce((min: Persona, p: Persona) => {
        min = min || p;
        return min.level > p.level ? p : min;
      }, null);
  }

  getPreviousRank(current: Persona): Persona {
    return this.arcanaGroups[current.arcana]
      .filter((persona: Persona) => {
        return !persona.special && persona.level < current.level;
      })
      .reduce((max: Persona, p: Persona) => {
        max = max || p;
        return max.level < p.level ? p : max;
      }, null);
  }
}
