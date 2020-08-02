import { Persona } from '../models/persona';
import { FusionNode } from '../models/fusion-node';
import { FusionResult } from '../models/fusion-result';
import { InheritableSkill } from '../models/inheritable-skill';
import { SkillInheritanceService } from '../services/skill-inheritance.service';
import { countSkillPicks } from '../helpers/count-skill-picks-helper';
import { FusionSkillsBuilder } from './fusion-skills-builder';

export class FusionBuilder {
  inheritableSkills: InheritableSkill[];
  skillsInheritedCount: number;
  constructor(
    private persona: Persona,
    private fusionItems: FusionNode[],
    private skillInheritanceService: SkillInheritanceService,
  ) {}

  build(): FusionResult {
    this.inheritableSkills = new FusionSkillsBuilder(
      this.persona,
      this.fusionItems,
      this.skillInheritanceService,
    ).build();

    this.countSkillsInherited();
    return {
      persona: this.persona,
      fusionComponents: this.fusionItems,
      currentLevel: this.persona.level,
      skills: this.persona.skills.filter((skill) => skill.level === 0),
      skillsInheritedCount: this.skillsInheritedCount,
      inheritableSkills: this.inheritableSkills,
    };
  }

  private countSkillsInherited(): void {
    const filteredInheritableSkillsCount = this.inheritableSkills.filter(
      (s) => s.probRatio > 0,
    ).length;
    this.skillsInheritedCount = Math.min(
      countSkillPicks(this.persona, this.fusionItems),
      filteredInheritableSkillsCount,
    );
  }
}
