import { Component, OnInit, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../models/persona';
import { Skill } from '../models/skill';
import { CompendiumService } from '../services/compendium.service';
import { SimulatorService } from '../services/simulator.service';
import { SkillService } from '../services/skill.service';
import { ListDialogComponent } from '../shared/list-dialog/list-dialog.component';
import { SkillsDialogComponent } from '../shared/skills-dialog/skills-dialog.component';
import { SaveFusionDialogComponent } from './components/save-fusion-dialog/save-fusion-dialog.component';
import { FusionNode } from '../models/fusion-node';
import { FusionResult } from '../models/fusion-result';
import { MatDialog } from '@angular/material/dialog';
import { FusionNodeHelper } from './helpers/fusion-node-helper';
import { ActiveGameService } from '../services/active-game.service';
import { SettingsService } from '../services/settings.service';
import { AppSettingsService } from '../services/app-settings.service';
import { TitleService } from '../services/title.service';

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
  fusionNodeHelper: FusionNodeHelper;

  settingsService: SettingsService;

  constructor(
    private injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private location: Location,
    private activeGameService: ActiveGameService,
    private appSettingsService: AppSettingsService,
    private titleService: TitleService,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.compendiumService = this.injector.get<CompendiumService>(
      tokens.compendium,
    );
    this.simulatorService = this.injector.get<SimulatorService>(
      tokens.simulator,
    );
    this.skillService = this.injector.get<SkillService>(tokens.skill);
    this.titleService.setTitle(
      'Simulator',
      this.activeGameService.fullGameName,
    );
  }

  ngOnInit(): void {
    this.fusionNodeHelper = new FusionNodeHelper(
      this.compendiumService,
      this.skillService,
    );
    this.loadFusionNodesFromRouteParams();
  }

  fusionItemPlaceholders(): number[] {
    const length = 3 - this.fusionItems.length;
    return Array(length >= 0 ? length : 0);
  }

  saveFusion(): void {
    this.openSaveFusionDialog();
  }

  addItem(): void {
    this.openPersonaListDialog((fusionItem: FusionNode) => {
      if (fusionItem) {
        this.fusionItems.push(fusionItem);
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

  showProbabilities(): boolean {
    return this.appSettingsService.getValues()['PROBABILITY'];
  }

  randomInheritance(): boolean {
    return ['p3p', 'p3fes', 'p3ans', 'p4'].includes(
      this.activeGameService.game,
    );
  }

  private loadFusionNodesFromRouteParams(): void {
    this.fusionItems = this.fusionNodeHelper.createFusionNodesFromRouteParams(
      this.route.parent.snapshot.queryParams,
    );
    this.fuse(false);
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

  private openPersonaListDialog(fn: (res) => void): void {
    const dialogRef = this.matDialog.open(ListDialogComponent, {
      panelClass: 'simulator-list-overlay-pane',
    });
    dialogRef.afterClosed().subscribe(fn);
  }

  private openSaveFusionDialog(): void {
    const dialogRef = this.matDialog.open(SaveFusionDialogComponent, {
      data: {
        fusionItem: this.fusionYield,
      },
      panelClass: 'simulator-save-overlay-pane',
    });
  }
}
