import { Injectable, Inject } from '@angular/core';
import { FusionChartService } from './fusion-chart.service';
import { CompendiumService } from './compendium.service';
import { SkillInheritanceService } from './skill-inheritance.service';
import { Persona } from '../models/persona';
import { FusionNode } from '../models/fusion-node';
import { FusionResult } from '../models/fusion-result';
import { SettingsService } from './settings.service';
import { NormalFusion } from '../lib/normal-fusion';

@Injectable()
export class SimulatorService {
  constructor(
    @Inject(FusionChartService) private fusionChartService: FusionChartService,
    @Inject(CompendiumService) private compendiumService: CompendiumService,
    @Inject(SkillInheritanceService)
    private skillInheritanceService: SkillInheritanceService,
    @Inject(SettingsService) private SettingsService: SettingsService,
  ) {}

  fuse(fusionItems: FusionNode[]): FusionResult {
    if (!this.validateUniqueness(fusionItems)) return;
    const persona =
      this.fuseSpecial(fusionItems) ||
      this.fuseNormal(fusionItems) ||
      this.fuseTriangle(fusionItems);

    if (persona) {
      return this.createFusionResult(persona, fusionItems);
    }
  }

  private validateUniqueness(fusionItems: FusionNode[]): boolean {
    const uniqueIdsCount = new Set(fusionItems.map((f) => f.persona.id)).size;
    return uniqueIdsCount === fusionItems.length;
  }

  private fuseSpecial(fusionItems: FusionNode[]): Persona {
    const p = this.fusionChartService.trySpecialFusion(
      fusionItems.map((f) => f.persona),
    );
    if (p && this.SettingsService.testPersona(p)) return p;
  }

  private fuseNormal(fusionItems: FusionNode[]): Persona {
    if (fusionItems.length !== 2) return;
    const [p1, p2] = fusionItems.map((f) => f.persona);
    const fusion = new NormalFusion(this.compendiumService, p1, p2);
    return fusion.fuseUnknownArcana(this.fusionChartService);
  }

  private findNormalFusionArcana([a1, a2]: number[]): number {
    return this.fusionChartService.findNormalFusionChartResult([a1, a2]);
  }

  private findTriangleFusionArcana([a1, a2, a3]: number[]): number {
    const a2a3 = this.findNormalFusionArcana([a2, a3]);
    return this.fusionChartService.findTriangleFusionChartResult([a1, a2a3]);
  }

  private fuseTriangle(fusionItems: FusionNode[]): Persona {
    if (fusionItems.length !== 3) return;
    const [p1, p2, p3] = this.sortFusionItems(fusionItems).map(
      (f) => f.persona,
    );
    const fusionLevel = Math.floor((p1.level + p2.level + p3.level) / 3) + 5;
    const arcana = this.findTriangleFusionArcana([
      p1.arcana,
      p2.arcana,
      p3.arcana,
    ]);
    if (arcana === undefined) return;
    return this.compendiumService.findClosestOneRankHigher(
      arcana,
      fusionLevel,
      p1,
      p2,
      p3,
    );
  }

  private sortFusionItems(fusionItems: FusionNode[]): FusionNode[] {
    const fusionItemsCopy: FusionNode[] = [...fusionItems];
    return fusionItemsCopy.sort(
      (a, b) =>
        b.currentLevel - a.currentLevel || a.persona.arcana - b.persona.arcana,
    );
  }
  
  private createFusionResult(
    persona: Persona,
    fusionItems: FusionNode[],
  ): FusionResult {
    return {
      persona,
      fusionComponents: fusionItems,
      currentLevel: persona.level,
      skills: persona.skills.filter((skill) => skill.level === 0),
      skillsInheritedCount: this.skillInheritanceService.numberOfSkillsInherited(
        persona,
        fusionItems,
      ),
      inheritableSkills: this.skillInheritanceService.findInheritableSkills(
        persona,
        fusionItems,
      ),
    };
  }
}
