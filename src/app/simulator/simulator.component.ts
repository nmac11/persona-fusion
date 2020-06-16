import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../models/persona';
import { Skill } from '../models/skill';
import { CompendiumService } from '../services/compendium.service';
import { SimulatorService } from '../services/simulator.service';
import { SkillService } from '../services/skill.service';
import { serviceToken } from '../helpers/service-token-helper';
import { ListDialogComponent } from './components/list-dialog/list-dialog.component';
import { SkillsDialogComponent } from './components/skills-dialog/skills-dialog.component';
import { FusionNode } from '../models/fusion-node';
import { FusionResult } from '../models/fusion-result';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'simulator-root',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})
export class SimulatorComponent implements OnInit {
  fusionItems: FusionNode[] = [];
  fusionYield: FusionResult;
  compendiumService: CompendiumService;
  simulatorService: SimulatorService;
  skillService: SkillService;

  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private personaListDialog: MatDialog,
    private skillsDialog: MatDialog,
  ) {
    const game = this.route.parent.snapshot.params.game;
    this.compendiumService = this.injector.get<CompendiumService>(
      serviceToken[game].compendium,
    );
    this.simulatorService = this.injector.get<SimulatorService>(
      serviceToken[game].simulator,
    );
    this.skillService = this.injector.get<SkillService>(
      serviceToken[game].skill,
    );
  }

  ngOnInit(): void {
    this.createFusionNodesFromRouteParams();
  }

  changePersona(fusionItem: FusionNode): void {
    const dialogRef = this.openPersonaListDialog(
      (p: Persona) => {
        if (p) {
          Object.assign(fusionItem, this.createFusionNode(p));
          this.fuse();
        }
      },
      { persona: fusionItem.persona },
    );
  }

  changeLevel(event: any, fusionItem: FusionNode): void {
    const inputLevel = event.target.value;
    const previousLevel = fusionItem.currentLevel;
    this.setLevel(fusionItem, inputLevel);
    this.updateSkills(fusionItem, previousLevel);
    this.fuse();
  }

  addItem(): void {
    let persona: Persona;
    this.openPersonaListDialog((p: Persona) => {
      persona = p;
      if (p) {
        this.fusionItems.push(this.createFusionNode(p));
        this.fuse();
      }
    });
  }

  removeItem(i: number): void {
    this.fusionItems.splice(i, 1);
    this.fuse();
  }

  clearItems(): void {
    this.fusionItems = [];
    this.fusionYield = null;
    this.updateQueryParams();
  }

  editSkills(fusionItem: FusionNode): void {
    const dialogRef = this.personaListDialog.open(SkillsDialogComponent, {
      data: { fusionItem, skillService: this.skillService },
    });
    dialogRef.afterClosed().subscribe(() => this.fuse());
  }

  private setLevel(fusionItem, level): void {
    if (level > 99) fusionItem.currentLevel = 99;
    else if (level < fusionItem.persona.level)
      fusionItem.currentLevel = fusionItem.persona.level;
    else fusionItem.currentLevel = level;
  }

  private updateSkills(fusionItem, previousLevel): void {
    const currentLevel = fusionItem.currentLevel;
    if (currentLevel > previousLevel)
      this.learnSkills(fusionItem, previousLevel, currentLevel);
    else this.unlearnSkills(fusionItem, previousLevel, currentLevel);
  }

  private learnSkills(
    fusionItem: FusionNode,
    previousLevel: number,
    currentLevel: number,
  ) {
    const acquiredSkills = fusionItem.persona.skills.filter(
      (skill) =>
        skill.level > previousLevel &&
        skill.level <= currentLevel &&
        !fusionItem.skills.some(
          (learnedSkill) => learnedSkill.name === skill.name,
        ),
    );
    fusionItem.skills.push(...acquiredSkills);
  }

  private unlearnSkills(
    fusionItem: FusionNode,
    previousLevel: number,
    currentLevel: number,
  ) {
    fusionItem.skills = fusionItem.skills.filter(
      (skill) => skill.level <= currentLevel || !skill.level,
    );
  }

  private createFusionNodesFromRouteParams(): void {
    const queryParams = this.route.parent.snapshot.queryParams;
    for (let i = 2, param = queryParams['p1']; param; i++) {
      this.createFusionNodeFromParam(param);
      param = queryParams[`p${i}`];
    }
    this.fuse();
  }

  private createFusionNodeFromParam(param: string): void {
    const [name, level, ...skillNames] = param.split(',');
    const persona: Persona = this.compendiumService.find(name);
    const skills: Skill[] = this.findSkills(skillNames);
    if (persona)
      this.fusionItems.push(this.createFusionNode(persona, +level, skills));
  }

  private findSkills(skillNames: string[]) {
    return skillNames.reduce((skills, skillName) => {
      const skill = this.skillService.find(skillName);
      if (skill) skills.push(skill);
      return skills;
    }, []);
  }

  private createFusionNode(
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

  private fuse(): void {
    this.fusionYield = this.simulatorService.fuse(this.fusionItems);
    this.updateQueryParams();
  }

  private updateQueryParams(): void {
    const queryParams = {};
    if (this.fusionYield)
      this.fusionItems.forEach((f, i) => {
        queryParams['p' + (i + 1)] = [
          f.persona.name.toLowerCase(),
          f.currentLevel,
          f.skills.slice(0, 8).map((skill) => skill.name.toLowerCase()),
        ].join(',');
      });
    this.router.navigate([], {
      queryParams,
    });
  }

  private openPersonaListDialog(fn: (res) => void, options = {}) {
    const data = {
      compendium: this.compendiumService,
    };
    Object.assign(data, options);
    const dialogRef = this.personaListDialog.open(ListDialogComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe(fn);
  }
}
