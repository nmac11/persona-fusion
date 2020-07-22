import { Injectable, Inject } from '@angular/core';
import {
  P5FusionChartService,
  P3P4FusionChartService,
  FusionChartService,
} from './fusion-chart.service';
import { CompendiumService } from './compendium.service';
import { SkillInheritanceService } from './skill-inheritance.service';
import { Persona } from '../models/persona';
import { FusionNode } from '../models/fusion-node';
import { FusionResult } from '../models/fusion-result';
import { SettingsService } from './settings.service';
import { NormalFusion } from '../lib/normal-fusion';
import { TriangleFusion } from '../lib/triangle-fusion';
import { InheritableSkill } from '../models/inheritable-skill';

export abstract class SimulatorService {
  constructor(
    @Inject(FusionChartService)
    protected fusionChartService: FusionChartService,
    @Inject(CompendiumService) protected compendiumService: CompendiumService,
    @Inject(SkillInheritanceService)
    protected skillInheritanceService: SkillInheritanceService,
    @Inject(SettingsService) protected settingsService: SettingsService,
  ) {}

  fuse(fusionItems: FusionNode[]): FusionResult {
    if (!this.validateUniqueness(fusionItems)) return;
    const persona =
      this.fuseSpecial(fusionItems) ||
      this.fuseNormal(fusionItems) ||
      this.fuseOther(fusionItems);

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
    if (p && this.settingsService.testPersona(p)) return p;
  }

  private fuseNormal(fusionItems: FusionNode[]): Persona {
    if (fusionItems.length !== 2) return;
    const [p1, p2] = fusionItems.map((f) => f.persona);
    const fusion = new NormalFusion(this.compendiumService, p1, p2);
    return fusion.fuseUnknownArcana(this.fusionChartService);
  }

  protected abstract fuseOther(fusionItems: FusionNode[]): Persona;

  private createFusionResult(
    persona: Persona,
    fusionItems: FusionNode[],
  ): FusionResult {
    const inheritableSkills = this.findInheritableSkills(persona, fusionItems);
    const skillsInheritedCount = this.countSkillsInherited(
      persona,
      fusionItems,
      inheritableSkills,
    );
    return {
      persona,
      fusionComponents: fusionItems,
      currentLevel: persona.level,
      skills: persona.skills.filter((skill) => skill.level === 0),
      skillsInheritedCount,
      inheritableSkills,
    };
  }

  private findInheritableSkills(
    persona: Persona,
    fusionItems: FusionNode[],
  ): InheritableSkill[] {
    return this.skillInheritanceService.findInheritableSkills(
      persona,
      fusionItems,
    );
  }

  private countSkillsInherited(
    persona: Persona,
    fusionItems: FusionNode[],
    inheritableSkills: InheritableSkill[],
  ): number {
    const filteredInheritableSkillsCount = inheritableSkills.filter(
      (s) => s.probRatio > 0,
    ).length;
    return Math.min(
      this.skillInheritanceService.countSkillsInherited(persona, fusionItems),
      filteredInheritableSkillsCount,
    );
  }
}

@Injectable()
export class P3P4SimulatorService extends SimulatorService {
  constructor(
    @Inject(P3P4FusionChartService)
    protected fusionChartService: P3P4FusionChartService,
    @Inject(CompendiumService) protected compendiumService: CompendiumService,
    @Inject(SkillInheritanceService)
    protected skillInheritanceService: SkillInheritanceService,
    @Inject(SettingsService) protected settingsService: SettingsService,
  ) {
    super(
      fusionChartService,
      compendiumService,
      skillInheritanceService,
      settingsService,
    );
  }

  private fuseTriangle(fusionItems: FusionNode[]): Persona {
    if (fusionItems.length !== 3) return;
    const [p1, p2, p3] = this.sortFusionItems(fusionItems).map(
      (f) => f.persona,
    );
    const fusion = new TriangleFusion(this.compendiumService, p1, p2, p3);
    return fusion.fuseUnknownArcana(this.fusionChartService);
  }

  private sortFusionItems(fusionItems: FusionNode[]): FusionNode[] {
    const fusionItemsCopy: FusionNode[] = [...fusionItems];
    return fusionItemsCopy.sort(
      (a, b) =>
        b.currentLevel - a.currentLevel || a.persona.arcana - b.persona.arcana,
    );
  }

  protected fuseOther(fusionItems: FusionNode[]): Persona {
    return this.fuseTriangle(fusionItems);
  }
}

@Injectable()
export class P5SimulatorService extends SimulatorService {
  constructor(
    @Inject(P5FusionChartService)
    protected fusionChartService: P5FusionChartService,
    @Inject(CompendiumService) protected compendiumService: CompendiumService,
    @Inject(SkillInheritanceService)
    protected skillInheritanceService: SkillInheritanceService,
    @Inject(SettingsService) protected settingsService: SettingsService,
  ) {
    super(
      fusionChartService,
      compendiumService,
      skillInheritanceService,
      settingsService,
    );
  }

  protected fuseOther(fusionItems: FusionNode[]): Persona {
    return;
  }
}
