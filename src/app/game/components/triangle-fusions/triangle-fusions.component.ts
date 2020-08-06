import { Component, OnDestroy, OnInit, Injector, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  exactMatchRegExp,
  partialMatchRegExp,
} from '../../../helpers/reg-exp-helpers';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { TriangleFusionService } from '../../../services/triangle-fusion.service';
import { p3pTriangleFusionProvider } from '../../../tokens/p3p/triangle-fusion-service-token';
import { p3fesTriangleFusionProvider } from '../../../tokens/p3fes/triangle-fusion-service-token';
import { p3ansTriangleFusionProvider } from '../../../tokens/p3ans/triangle-fusion-service-token';
import { p4gTriangleFusionProvider } from '../../../tokens/p4g/triangle-fusion-service-token';
import { p4TriangleFusionProvider } from '../../../tokens/p4/triangle-fusion-service-token';
import { ActiveGameService } from '../../../services/active-game.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PersonaPreviewBottomSheetComponent } from '../../../shared/persona-preview-bottom-sheet/persona-preview-bottom-sheet.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'game-triangle-fusions',
  templateUrl: './triangle-fusions.component.html',
  styleUrls: ['./triangle-fusions.component.css'],
  providers: [
    p3pTriangleFusionProvider,
    p3fesTriangleFusionProvider,
    p3ansTriangleFusionProvider,
    p4gTriangleFusionProvider,
    p4TriangleFusionProvider,
  ],
})
export class TriangleFusionsComponent implements OnInit, OnDestroy {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  availablePersonae: Persona[] = [];
  fusionService: TriangleFusionService;
  selectedPersonae: Persona[] = [];
  compendiumService: CompendiumService;
  @Input('persona') persona: Persona;
  nameFilters: string[] = [];
  availablePersonaeSub: Subscription;
  loading: boolean = true;

  constructor(
    private injector: Injector,
    private activeGameService: ActiveGameService,
    private bottomSheet: MatBottomSheet,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.compendiumService = this.injector.get<CompendiumService>(
      tokens.compendium,
    );
    this.fusionService = this.injector.get<TriangleFusionService>(
      tokens.triangleFusion,
    );
    this.availablePersonaeSub = this.fusionService.availablePersonae$.subscribe(
      (available) => {
        this.availablePersonae = available;
        this.loading = false;
      },
    );
  }

  ngOnInit(): void {
    this.fusionService.findFusions(this.persona);
  }

  ngOnDestroy(): void {
    this.availablePersonaeSub.unsubscribe();
  }

  openBottomSheet(persona: Persona) {
    this.bottomSheet.open(PersonaPreviewBottomSheetComponent, {
      data: persona,
    });
  }

  removeFilter(persona: Persona): void {
    const index = this.selectedPersonae.map((p) => p.id).indexOf(persona.id);
    this.selectedPersonae.splice(index, 1);
    this.filter();
  }

  addNameFilter(event: any) {
    const input: HTMLInputElement = event.input;
    const value: string = event.value.replace(/[^A-Za-z\'-\s]/g, '');

    if ((value || '').trim()) {
      this.nameFilters.push(value);
      this.filter();
    }

    if (input) input.value = '';
  }

  removeNameFilter(index: number) {
    this.nameFilters.splice(index, 1);
    this.filter();
  }

  select(persona: Persona): void {
    if (!this.selectedPersonae.some((p) => p.id === persona.id))
      this.selectedPersonae.push(persona);
    this.fusionService.select(this.selectedPersonae);
    this.loading = true;
  }

  filter(): void {
    this.fusionService.filter(this.nameFilters);
    this.loading = true;
  }

  simulatorQueryParams(): Object {
    const [p1, p2, p3] = this.selectedPersonae.map((p) => p.name.toLowerCase());
    return { p1, p2, p3 };
  }
}
