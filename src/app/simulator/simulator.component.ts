import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from '../models/persona';
import { CompendiumService } from '../services/compendium.service';
import { SimulatorService } from '../services/simulator.service';
import { serviceToken } from '../helpers/service-token-helper';
import { ListDialogComponent } from './components/list-dialog/list-dialog.component';
import { FusionNode } from '../models/fusion-node';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'simulator-root',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css'],
})
export class SimulatorComponent implements OnInit {
  fusionItems: FusionNode[] = [];
  fusionYield: FusionNode;
  compendiumService: CompendiumService;
  simulatorService: SimulatorService;

  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    const game = this.route.parent.snapshot.params.game;
    this.compendiumService = this.injector.get<CompendiumService>(
      serviceToken[game].compendium,
    );
    this.simulatorService = this.injector.get<SimulatorService>(
      serviceToken[game].simulator,
    );
  }

  ngOnInit(): void {}

  arcanaName(arcana: number): string {
    return this.compendiumService.arcanaName(arcana);
  }

  changePersona(fusionItem: FusionNode): void {
    const dialogRef = this.openDialog(
      (p: Persona) => {
        if (p) Object.assign(fusionItem, { persona: p, currentLevel: p.level });
      },
      { persona: fusionItem.persona },
    );
  }

  changeLevel(event: any, fusionItem: FusionNode): void {
    const inputLevel = event.target.value;
    if (!(inputLevel <= 99 && inputLevel >= fusionItem.persona.level))
      fusionItem.currentLevel = fusionItem.persona.level;
  }

  addItem(): void {
    let persona: Persona;
    const fusionItem: FusionNode = { persona: null };
    this.openDialog((p: Persona) => {
      persona = p;
      if (p) this.fusionItems.push({ persona: p, currentLevel: p.level });
    });
  }

  removeItem(i: number): void {
    this.fusionItems.splice(i, 1);
  }

  private openDialog(fn: (res) => void, options = {}) {
    const data = {
      compendium: this.compendiumService,
    };
    Object.assign(data, options);
    const dialogRef = this.dialog.open(ListDialogComponent, {
      width: '400px',
      data,
    });
    dialogRef.afterClosed().subscribe(fn);
  }
}
