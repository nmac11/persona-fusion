import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from '../models/persona';
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

  ngOnInit(): void {}

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

  private createFusionNode(p: Persona): FusionNode {
    return {
      persona: p,
      currentLevel: p.level,
      skills: p.skills.filter((skill) => skill.level === 0),
    };
  }

  private fuse(): void {
    this.fusionYield = this.simulatorService.fuse(this.fusionItems);
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
