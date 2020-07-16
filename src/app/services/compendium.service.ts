import { Injectable, Inject } from '@angular/core';
import { Persona } from '../models/persona';
import { exactMatchRegExp } from '../helpers/reg-exp-helpers';
import { SettingsService } from './settings.service';

@Injectable()
export class CompendiumService {
  private arcanaGroups: Persona[][];

  constructor(
    @Inject(Array) private compendium: Array<Persona>,
    @Inject(SettingsService) private settingsService: SettingsService,
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
    this.arcanaGroups.map((group) => group.sort((a, b) => a.level - b.level));
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

  findClosestOneRankLower(
    arcana: number,
    level: number,
    ...exclusions: Persona[]
  ): Persona {
    let persona = this.getPreviousRankFromLevel(arcana, level);
    while (exclusions.map((p) => p.id).includes(persona?.id))
      persona = this.getPreviousRank(persona);
    return persona;
  }

  findClosestOneRankHigher(
    arcana: number,
    level: number,
    ...exclusions: Persona[]
  ): Persona {
    let persona = this.getNextRankFromLevel(arcana, level);
    while (exclusions.map((p) => p.id).includes(persona?.id))
      persona = this.getNextRank(persona);
    return persona;
  }

  getNextRankFromLevel(arcana: number, level: number): Persona {
    return (
      this.arcanaGroups[arcana]
        .filter(this.filterRestricted)
        .find((p: Persona) => p.level >= level) || this.getHighestRank(arcana)
    );
  }

  private getPreviousRankFromLevel(arcana: number, level: number): Persona {
    return (
      this.arcanaGroups[arcana]
        .concat()
        .sort((a, b) => b.level - a.level)
        .filter(this.filterRestricted)
        .find((p: Persona) => p.level <= level) || this.getLowestRank(arcana)
    );
  }

  private getHighestRank(arcana: number): Persona {
    const group = this.arcanaGroups[arcana].filter(this.filterRestricted);
    return group[group.length - 1];
  }

  private getLowestRank(arcana: number): Persona {
    const group = this.arcanaGroups[arcana].filter(this.filterRestricted);
    return group[0];
  }

  private getNextRank(current: Persona): Persona {
    return this.arcanaGroups[current.arcana]
      .filter(this.filterRestricted)
      .find((p: Persona) => p.level > current.level);
  }

  private getPreviousRank(current: Persona): Persona {
    return this.arcanaGroups[current.arcana]
      .concat()
      .sort((a, b) => b.level - a.level)
      .filter(this.filterRestricted)
      .find((p: Persona) => p.level < current.level);
  }

  private filterRestricted: (p: Persona) => boolean = (p) => {
    return !(p.special || p.gem) && this.settingsService.testPersona(p);
  };
}
