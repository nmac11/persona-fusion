import { Persona } from '../../models/persona';
import { Skill } from '../../models/skill';
import { FusionNode } from '../../models/fusion-node';
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
    return {
      persona: p,
      currentLevel: level >= p.level && level < 100 ? level : p.level,
      skills: skills.length
        ? skills
        : p.skills.filter((skill) => skill.level === 0),
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

  private createFusionNodeFromParam(param: string): FusionNode {
    const [name, level, ...skillNames] = param.split(',');
    const persona: Persona = this.compendiumService.find(name);
    const skills: Skill[] = this.findSkills(skillNames);
    if (persona) return this.createFusionNode(persona, +level, skills);
  }

  private findSkills(skillNames: string[]): Skill[] {
    return skillNames.reduce((skills, skillName) => {
      const skill = this.skillService.find(skillName);
      if (skill && !skills.some((learned) => learned.name === skill.name))
        skills.push(skill);
      return skills;
    }, []);
  }
}
