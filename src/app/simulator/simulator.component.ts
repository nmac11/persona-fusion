import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../services/compendium.service';
import { SimulatorService } from '../services/simulator.service';
import { SkillService } from '../services/skill.service';
import { ListDialogComponent } from '../shared/list-dialog/list-dialog.component';
import { SaveFusionDialogComponent } from './components/save-fusion-dialog/save-fusion-dialog.component';
import { FusionNode } from '../models/fusion-node';
import { FusionResult } from '../models/fusion-result';
import { MatDialog } from '@angular/material/dialog';
import { FusionNodeHelper } from './helpers/fusion-node-helper';
import { SettingsService } from '../services/settings.service';
import { TitleService } from '../services/title.service';
import { InheritableSkill } from '../models/inheritable-skill';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';
import { GameConfig } from '../models/game-config';

@Component({
  selector: 'simulator-root',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})
export class SimulatorComponent implements OnInit {
  fusionItems: FusionNode[] = [];
  fusionYield: FusionResult;
  fusionNodeHelper: FusionNodeHelper;

  settingsService: SettingsService;
  saveName: string;

  constructor(
    @Inject(GAME_CONFIG) private config: GameConfig,
    private compendiumService: CompendiumService,
    private simulatorService: SimulatorService,
    private skillService: SkillService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private location: Location,
    private titleService: TitleService,
  ) {
    this.titleService.setTitle('Simulator', this.config.fullTitle);
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
    this.saveName = null;
    this.updateQueryParams();
  }

  fuse(update = true): void {
    this.saveName = null;
    this.fusionYield = this.simulatorService.fuse(this.fusionItems);
    if (update) this.updateQueryParams();
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
          f.skills.slice(0, 8).map((skill) => {
            let skillName = skill.name.toLowerCase();
            if (skill.level !== undefined) skillName = '_' + skillName;
            return skillName;
          }),
        ].join(',');
      });
    const path = this.config.title + '/simulator';

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
    dialogRef.afterClosed().subscribe((saveName) => (this.saveName = saveName));
  }
}
