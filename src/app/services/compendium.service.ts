import { Injectable, Inject } from '@angular/core';
import { Persona } from '../models/persona';
import { exactMatchRegExp } from '../helpers/reg-exp-helpers';
import { SettingsService } from './settings.service';
import { AppSettingsService } from './app-settings.service';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';
import { GameConfig } from '../models/game-config';

@Injectable()
export class CompendiumService {
  private arcanaGroups: Persona[][];
  private compendium: Persona[];

  constructor(
    @Inject(GAME_CONFIG) private config: GameConfig,
    private settingsService: SettingsService,
    private appSettingsService: AppSettingsService,
  ) {
    this.compendium = this.config.compendium;
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
    let personae =
      arcana !== null ? this.arcanaGroups[arcana] : this.compendium;
    if (this.appSettingsService.getValues()['HIDEBLOCKED'])
      personae = personae.filter((p) => this.settingsService.testPersona(p));
    return personae;
  }

  getAllWithRestrictions(arcana: number): Array<Persona> {
    return this.arcanaGroups[arcana].filter(this.filterRestricted);
  }

  find(name: string): Persona {
    const kwdRegex = exactMatchRegExp(name);
    return this.compendium.find((persona) => kwdRegex.test(persona.name));
  }

  findById(id: number): Persona {
    return this.compendium.find((persona) => persona.id === id);
  }

  findClosestUpgrade(
    arcana: number,
    level: number,
    ...exclusions: Persona[]
  ): Persona {
    let persona =
      this.findEqualOrHigherRank(arcana, level) || this.getHighestRank(arcana);
    while (exclusions.map((p) => p.id).includes(persona?.id))
      persona = this.getNextRank(persona);
    return persona;
  }

  findClosestDowngrade(
    arcana: number,
    level: number,
    ...exclusions: Persona[]
  ): Persona {
    let persona =
      this.findEqualOrLowerRank(arcana, level) || this.getLowestRank(arcana);
    while (exclusions.map((p) => p.id).includes(persona?.id))
      persona = this.getPreviousRank(persona);
    return persona;
  }

  upgradeOneRank(persona: Persona, currentLevel: number = null): Persona {
    const level = currentLevel || persona.level;
    return this.findHigherRank(persona.arcana, level);
  }

  upgradeTwoRanks(persona: Persona, currentLevel: number = null): Persona {
    const firstUpgrade = this.upgradeOneRank(persona, currentLevel);
    if (firstUpgrade) return this.getNextRank(firstUpgrade);
  }

  downgradeOneRank(persona: Persona, currentLevel: number = null): Persona {
    const level = currentLevel || persona.level;
    let downgrade = this.findLowerRank(persona.arcana, level);
    return downgrade?.id === persona.id
      ? this.getPreviousRank(downgrade)
      : downgrade;
  }

  downgradeTwoRanks(persona: Persona, currentLevel: number = null): Persona {
    const firstDowngrade = this.downgradeOneRank(persona, currentLevel);
    if (!firstDowngrade) return;
    let secondDowngrade = this.getPreviousRank(firstDowngrade);
    return secondDowngrade?.id === persona.id
      ? this.getPreviousRank(secondDowngrade)
      : secondDowngrade;
  }

  private findEqualOrHigherRank(arcana: number, level: number): Persona {
    return this.arcanaGroups[arcana]
      .filter(this.filterRestricted)
      .find((p: Persona) => p.level >= level);
  }

  private findEqualOrLowerRank(arcana: number, level: number): Persona {
    return this.arcanaGroups[arcana]
      .concat()
      .sort((a, b) => b.level - a.level)
      .filter(this.filterRestricted)
      .find((p: Persona) => p.level <= level);
  }

  private findHigherRank(arcana: number, level: number): Persona {
    return this.arcanaGroups[arcana]
      .filter(this.filterRestricted)
      .find((p: Persona) => p.level > level);
  }

  private findLowerRank(arcana: number, level: number): Persona {
    return this.arcanaGroups[arcana]
      .concat()
      .sort((a, b) => b.level - a.level)
      .filter(this.filterRestricted)
      .find((p: Persona) => p.level < level);
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
