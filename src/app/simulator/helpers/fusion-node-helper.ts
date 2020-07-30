import { Persona } from '../../models/persona';
import { Skill } from '../../models/skill';
import { InheritableSkill } from '../../models/inheritable-skill';
import { FusionNode } from '../../models/fusion-node';
import { FusionResult } from '../../models/fusion-result';
import { CompendiumService } from '../../services/compendium.service';
import { SkillService } from '../../services/skill.service';

export class FusionNodeHelper {
  constructor(
    private compendiumService: CompendiumService,
    private skillService: SkillService,
  ) {}

  createFusionNode(
    p: Persona,
    level: number = null,
    skills: Skill[] = [],
  ): FusionNode {
    const currentLevel = level >= p.level && level < 100 ? level : p.level;
    return {
      persona: p,
      currentLevel,
      skills: skills.length
        ? skills
        : p.skills.filter((skill) => skill.level <= currentLevel),
    };
  }

  createFusionNodesFromRouteParams(queryParams: any): FusionNode[] {
    const fusionItems: FusionNode[] = [];
    for (let i = 2, param = queryParams['p1']; param; i++) {
      const fusionItem = this.createFusionNodeFromParam(param);
      if (fusionItem) fusionItems.push(fusionItem);
      param = queryParams[`p${i}`];
    }
    return fusionItems;
  }

  convertFusionResult(
    fusionResult: FusionResult,
    inheritedSkills: InheritableSkill[],
  ): FusionNode {
    const {
      skillsInheritedCount,
      inheritableSkills,
      fusionComponents,
      skills,
      ...fusionNode
    } = fusionResult;

    this.limitFusionComponentsSkills(<FusionNode>fusionNode, fusionComponents);

    this.generateSkills(
      <FusionNode>fusionNode,
      fusionResult.skills,
      inheritedSkills,
    );
    return <FusionNode>fusionNode;
  }

  private limitFusionComponentsSkills(
    fusionNode: FusionNode,
    fusionComponents,
  ): void {
    fusionNode.fusionComponents = fusionComponents.reduce((res, f) => {
      const { skills, ...copy } = f;
      copy.skills = skills.slice(0, 8);
      res.push(copy);
      return res;
    }, []);
  }

  private generateSkills(
    fusionNode: FusionNode,
    innateSkills: Skill[],
    inheritedSkills: InheritableSkill[],
  ): void {
    fusionNode.skills = [
      ...innateSkills,
      ...this.convertInheritedSkills(inheritedSkills),
    ];
  }

  private convertInheritedSkills(
    inheritableSkills: InheritableSkill[],
  ): Skill[] {
    return inheritableSkills.map((s) => {
      const { probRatio, probability, ...skill } = s;
      return skill;
    });
  }

  private createFusionNodeFromParam(param: string): FusionNode {
    const [name, level, ...skillNames] = param.split(',');
    const persona: Persona = this.compendiumService.find(name);
    const skills: Skill[] = this.findSkills(persona, skillNames);
    if (persona) return this.createFusionNode(persona, +level, skills);
  }

  private findSkills(persona: Persona, skillNames: string[]): Skill[] {
    return skillNames.reduce((skills, skillName) => {
      let skill;
      if (skillName[0] === '_')
        persona.skills.find((s) => s.name === skillName.substr(1));
      else skill = this.skillService.find(skillName);
      if (skill && !skills.some((learned) => learned.name === skill.name))
        skills.push(skill);
      return skills;
    }, []);
  }
}
