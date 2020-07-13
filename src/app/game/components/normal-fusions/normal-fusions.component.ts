import { Component, OnInit, Injector, Input } from '@angular/core';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { NormalFusionService } from '../../../services/normal-fusion.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { partialMatchRegExp } from '../../../helpers/reg-exp-helpers';
import { p3pNormalFusionProvider } from '../../../tokens/p3p/normal-fusion-service-token';
import { p3fesNormalFusionProvider } from '../../../tokens/p3fes/normal-fusion-service-token';
import { p4gNormalFusionProvider } from '../../../tokens/p4g/normal-fusion-service-token';
import { p4NormalFusionProvider } from '../../../tokens/p4/normal-fusion-service-token';
import { p5NormalFusionProvider } from '../../../tokens/p5/normal-fusion-service-token';
import { NormalFusionsBottomSheetComponent } from '../normal-fusions-bottom-sheet/normal-fusions-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActiveGameService } from '../../../services/active-game.service';

@Component({
  selector: 'game-normal-fusions',
  templateUrl: './normal-fusions.component.html',
  styleUrls: ['./normal-fusions.component.css'],
  providers: [
    p3pNormalFusionProvider,
    p3fesNormalFusionProvider,
    p4gNormalFusionProvider,
    p4NormalFusionProvider,
    p5NormalFusionProvider,
  ],
})
export class NormalFusionsComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private compendiumService: CompendiumService;
  private fusionService: NormalFusionService;
  @Input('persona') persona: Persona;
  fusions: Persona[][];
  nameFilters: string[] = [];

  constructor(
    private injector: Injector,
    private bottomSheet: MatBottomSheet,
    private activeGameService: ActiveGameService,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.compendiumService = injector.get<CompendiumService>(tokens.compendium);
    this.fusionService = injector.get<NormalFusionService>(tokens.normalFusion);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.fusions = this.persona?.special
        ? []
        : this.fusionService.findFusions(this.persona);
    }, 0);
  }

  openBottomSheet(fusion: Persona[]): void {
    this.bottomSheet.open(NormalFusionsBottomSheetComponent, {
      data: fusion,
    });
  }

  addFilter(event: any) {
    const input: HTMLInputElement = event.input;
    const value: string = event.value.replace(/[^A-Za-z\'-\s]/g, '');

    if ((value || '').trim()) {
      this.nameFilters.push(value);
      this.filter();
    }

    if (input) input.value = '';
  }

  removeFilter(index: number) {
    this.nameFilters.splice(index, 1);
    this.filter();
  }

  private filter() {
    this.fusions = !this.nameFilters.length
      ? this.fusionService.list
      : this.fusionService.list.filter((pair) =>
          pair.some((persona) =>
            this.nameFilters.some((filterName) =>
              partialMatchRegExp(filterName).test(persona.name),
            ),
          ),
        );
  }
}
