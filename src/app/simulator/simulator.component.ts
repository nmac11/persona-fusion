import { Component, OnInit, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../models/persona';
import { Skill } from '../models/skill';
import { CompendiumService } from '../services/compendium.service';
import { SimulatorService } from '../services/simulator.service';
import { SkillService } from '../services/skill.service';
import { serviceToken } from '../helpers/service-token-helper';
import { ListDialogComponent } from '../shared/list-dialog/list-dialog.component';
import { SkillsDialogComponent } from '../shared/skills-dialog/skills-dialog.component';
import { SaveFusionDialogComponent } from './components/save-fusion-dialog/save-fusion-dialog.component';
import { FusionNode } from '../models/fusion-node';
import { FusionResult } from '../models/fusion-result';
import { MatDialog } from '@angular/material/dialog';
import { FusionNodeHelper } from './helpers/fusion-node-helper';
import { PersonaStoreService } from '../services/persona-store.service';

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
  personaStoreService: PersonaStoreService;
  fusionNodeHelper: FusionNodeHelper;

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
    this.personaStoreService = this.injector.get<PersonaStoreService>(
      serviceToken[game].personaStore,
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
    const data = {
      compendium: this.compendiumService,
      personaStore: this.personaStoreService,
      fusionNodeHelper: this.fusionNodeHelper,
    };
    const dialogRef = this.matDialog.open(ListDialogComponent, {
      data,
      panelClass: 'simulator-list-overlay-pane',
    });
    dialogRef.afterClosed().subscribe(fn);
  }

  private openSaveFusionDialog(): void {
    const dialogRef = this.matDialog.open(SaveFusionDialogComponent, {
      data: {
        fusionItem: this.fusionYield,
        personaStore: this.personaStoreService,
        fusionNodeHelper: this.fusionNodeHelper,
      },
      panelClass: 'simulator-save-overlay-pane',
    });
  }
}
