import { Injectable, Inject } from '@angular/core';
import { FusionNode } from '../models/fusion-node';
import { Persona } from '../models/persona';
import { Skill } from '../models/skill';
import { InheritableSkill } from '../models/inheritable-skill';
import { FusionResult } from '../models/fusion-result';
import { probability } from '../helpers/probability-helper';

@Injectable()
export class SkillInheritanceService {
  constructor(@Inject(Object) private inheritanceChart: any) {}

  numberOfSkillsInherited(persona: Persona, fusionItems: FusionNode[]): number {
    const maxInheritedSkills =
      8 - persona.skills.filter((s) => s.level === 0).length;
    const totalFusionSkills = fusionItems.reduce((total, item) => {
      total += item.skills.slice(0, 8).length;
      return total;
    }, 0);
    const chart = [0, 6, 9, 12, 24, 32, 99];
    const totalInheritedSkills = chart.indexOf(
      chart.find((n) => totalFusionSkills < n),
    );
    return totalInheritedSkills <= maxInheritedSkills
      ? totalInheritedSkills
      : maxInheritedSkills;
  }

  findInheritableSkills(
    persona: Persona,
    fusionItems: FusionNode[],
  ): InheritableSkill[] {
    const fusionSkills = this.findPossibleSkills(persona, fusionItems);
    return this.addProbabilities(
      persona.inherits,
      fusionSkills,
      this.numberOfSkillsInherited(persona, fusionItems),
    ).sort((a, b) => b.probRatio - a.probRatio);
  }

  private addProbabilities(
    inheritType: string,
    skills: Skill[],
    berths: number,
  ): InheritableSkill[] {
    const skillsWithPR = this.addProbRatios(inheritType, skills);
    const ratios = skillsWithPR.map((skill) => skill.probRatio);
    if (ratios.filter((r) => r !== 0).every((r) => r === ratios[0]))
      this.addProbabilitiesEqualRatios(skillsWithPR, ratios, berths);
    else this.addProbabilitiesVariableRatios(skillsWithPR, ratios, berths);
    return skillsWithPR;
  }

  private addProbabilitiesEqualRatios(
    skillsWithPR: InheritableSkill[],
    ratios: number[],
    berths: number,
  ): void {
    const netProbRatio = ratios.reduce((sum, ratio) => sum + ratio, 0);
    skillsWithPR.forEach(
      (skill) =>
        (skill.probability = (skill.probRatio * berths) / netProbRatio || 0),
    );
  }

  private addProbabilitiesVariableRatios(
    skillsWithPR: InheritableSkill[],
    ratios: number[],
    berths: number,
  ): void {
    const cache = { 0: 0 };
    skillsWithPR.forEach((skill, i) => {
      const cached = cache[skill.probRatio];
      skill.probability = cached ? cached : probability(ratios, berths, i);
      cache[skill.probRatio] = skill.probability;
    });
  }

  private addProbRatios(
    inheritType: string,
    fusionSkills: Skill[],
  ): InheritableSkill[] {
    return fusionSkills.reduce((iSkills, skill) => {
      const { level, ...iSkill } = skill;
      (iSkill as InheritableSkill).probRatio = this.findSkillProbRatio(
        inheritType,
        skill,
      );
      return [...iSkills, iSkill];
    }, []);
  }

  private findSkillProbRatio(inheritType: string, skill: Skill): number {
    if (skill.exclusive) return 0;
    const probRatio = this.inheritanceChart[inheritType][skill.type];
    return probRatio === undefined ? 1.0 : probRatio;
  }

  private findPossibleSkills(
    persona: Persona,
    fusionItems: FusionNode[],
  ): Skill[] {
    return this.findDistictFusionItemSkills(fusionItems).filter(
      (fSkill) =>
        !persona.skills.some(
          (skill) => skill.name === fSkill.name && skill.level === 0,
        ),
    );
  }

  private findDistictFusionItemSkills(fusionItems: FusionNode[]): Skill[] {
    return fusionItems.reduce((skills, fusionItem) => {
      const distinctSkills = fusionItem.skills
        .slice(0, 8)
        .filter(
          (fSkill) => !skills.some((skill) => skill.name === fSkill.name),
        );
      skills.push(...distinctSkills);
      return skills;
    }, []);
  }
}
