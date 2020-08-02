import { Persona } from '../models/persona';
import { FusionNode } from '../models/fusion-node';
import { SkillInheritanceService } from '../services/skill-inheritance.service';
import { InheritableSkill } from '../models/inheritable-skill';
import { countSkillPicks } from '../helpers/count-skill-picks-helper';
import { Skill } from '../models/skill';
import { Probabilities } from './probabilities';

export class FusionSkillsBuilder {
  inheritableSkills: InheritableSkill[];

  constructor(
    private persona: Persona,
    private fusionItems: FusionNode[],
    private skillInheritanceService: SkillInheritanceService,
  ) {}

  build(): InheritableSkill[] {
    const inheritableSkills = this.generateSkills();
    inheritableSkills.sort((a, b) => b.probRatio - a.probRatio);
    this.calculateProbabilities(inheritableSkills);
    return inheritableSkills;
  }

  private async calculateProbabilities(inheritableSkills): Promise<void> {
    //if (!this.appSettingsService.getValues()['PROBABILITY']) return;
    const ratios = inheritableSkills.map((skill) => skill.probRatio);
    const probabilities = await new Probabilities(
      ratios,
      countSkillPicks(this.persona, this.fusionItems),
    ).calculate();
    inheritableSkills.forEach((s) => (s.probability = probabilities[s.probRatio]));
  }

  private generateSkills(): InheritableSkill[] {
    return this.findPossibleSkills().reduce((iSkills, skill) => {
      const { level, ...iSkill } = skill;
      (iSkill as InheritableSkill).probRatio = this.skillInheritanceService.findSkillProbRatio(
        skill,
        this.persona.inherits,
      );
      return [...iSkills, iSkill];
    }, []);
  }

  private findPossibleSkills(): Skill[] {
    return this.findDistictFusionItemSkills().filter(
      (fSkill) =>
        !this.persona.skills.some(
          (skill) => skill.name === fSkill.name && skill.level === 0,
        ),
    );
  }

  private findDistictFusionItemSkills(): Skill[] {
    return this.fusionItems.reduce((skills, fusionItem) => {
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
