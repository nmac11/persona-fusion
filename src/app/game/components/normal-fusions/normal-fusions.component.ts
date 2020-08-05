import { Component, OnDestroy, OnInit, Injector, Input } from '@angular/core';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { NormalFusionService } from '../../../services/normal-fusion.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  partialMatchRegExp,
  exactMatchRegExp,
} from '../../../helpers/reg-exp-helpers';
import { p3pNormalFusionProvider } from '../../../tokens/p3p/normal-fusion-service-token';
import { p3fesNormalFusionProvider } from '../../../tokens/p3fes/normal-fusion-service-token';
import { p3ansNormalFusionProvider } from '../../../tokens/p3ans/normal-fusion-service-token';
import { p4gNormalFusionProvider } from '../../../tokens/p4g/normal-fusion-service-token';
import { p4NormalFusionProvider } from '../../../tokens/p4/normal-fusion-service-token';
import { p5NormalFusionProvider } from '../../../tokens/p5/normal-fusion-service-token';
import { p5rNormalFusionProvider } from '../../../tokens/p5r/normal-fusion-service-token';
import { FusionPreviewBottomSheetComponent } from '../../../shared/fusion-preview-bottom-sheet/fusion-preview-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActiveGameService } from '../../../services/active-game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'game-normal-fusions',
  templateUrl: './normal-fusions.component.html',
  styleUrls: ['./normal-fusions.component.css'],
  providers: [
    p3pNormalFusionProvider,
    p3fesNormalFusionProvider,
    p3ansNormalFusionProvider,
    p4gNormalFusionProvider,
    p4NormalFusionProvider,
    p5NormalFusionProvider,
    p5rNormalFusionProvider,
  ],
})
export class NormalFusionsComponent implements OnInit, OnDestroy {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private compendiumService: CompendiumService;
  private fusionService: NormalFusionService;
  @Input('persona') persona: Persona;
  fusions: Persona[][];
  nameFilters: string[] = [];
  fusionFilterSub: Subscription;

  constructor(
    private injector: Injector,
    private bottomSheet: MatBottomSheet,
    private activeGameService: ActiveGameService,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.compendiumService = injector.get<CompendiumService>(tokens.compendium);
    this.fusionService = injector.get<NormalFusionService>(tokens.normalFusion);
    this.fusionFilterSub = this.fusionService.filteredFusions$.subscribe(
      (fusions) => (this.fusions = fusions),
    );
  }

  ngOnInit(): void {
    this.fusionService.findFusions(this.persona);
  }

  ngOnDestroy(): void {
    this.fusionFilterSub.unsubscribe();
  }

  openBottomSheet(fusion: Persona[]): void {
    const fusionData = fusion.map((persona) => {
      return { persona };
    });
    this.bottomSheet.open(FusionPreviewBottomSheetComponent, {
      data: fusionData,
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

  private filter(): void {
    this.fusionService.filter(this.nameFilters);
  }
}
