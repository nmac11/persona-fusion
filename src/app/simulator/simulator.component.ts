import { Component, OnInit, Injector } from '@angular/core';
import { Location } from '@angular/common';
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
    private matDialog: MatDialog,
    private location: Location,
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

  fusionItemPlaceholders(): number[] {
    const length = 3 - this.fusionItems.length;
    return Array(length >= 0 ? length : 0);
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

  skillsToLearn(): Skill[] {
    return this.fusionYield.persona.skills
      .filter((s) => s.level)
      .sort((a, b) => a.level - b.level);
  }

  fuse(update = true): void {
    this.fusionYield = this.simulatorService.fuse(this.fusionItems);
    if (update) this.updateQueryParams();
  }

  private createFusionNodesFromRouteParams(): void {
    const queryParams = this.route.parent.snapshot.queryParams;
    for (let i = 2, param = queryParams['p1']; param; i++) {
      this.createFusionNodeFromParam(param);
      param = queryParams[`p${i}`];
    }
    this.fuse(false);
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

    const path = this.route.snapshot.pathFromRoot
      .map((o) => o.url[0])
      .join('/');

    if (Object.keys(queryParams).length) {
      var esc = encodeURIComponent;
      var query = Object.keys(queryParams)
        .map((k) => esc(k) + '=' + esc(queryParams[k]))
        .join('&');

      this.location.replaceState(path, query);
    } else {
      this.location.replaceState(path);
    }
  }

  private openPersonaListDialog(fn: (res) => void, options = {}) {
    const data = {
      compendium: this.compendiumService,
    };
    Object.assign(data, options);
    const dialogRef = this.matDialog.open(ListDialogComponent, {
      data,
      panelClass: 'simulator-list-overlay-pane',
    });
    dialogRef.afterClosed().subscribe(fn);
  }
}
