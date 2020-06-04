import { Component, OnInit, Injector, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { NormalFusionService } from '../../../services/normal-fusion.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { partialMatchRegExp } from '../../../helpers/reg-exp-helpers';
import { p3pNormalFusionProvider } from '../../../tokens/p3p/normal-fusion-service-token';
import { p3fesNormalFusionProvider } from '../../../tokens/p3fes/normal-fusion-service-token';
import { p4gNormalFusionProvider } from '../../../tokens/p4g/normal-fusion-service-token';
import { serviceToken } from '../../../helpers/service-token-helper';

@Component({
  selector: 'game-normal-fusions',
  templateUrl: './normal-fusions.component.html',
  styleUrls: ['./normal-fusions.component.css'],
  providers: [
    p3pNormalFusionProvider,
    p3fesNormalFusionProvider,
    p4gNormalFusionProvider,
  ],
})
export class NormalFusionsComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private compendiumService: CompendiumService;
  private fusionService: NormalFusionService;
  @Input('persona') persona: Persona;
  fusions: Persona[][];
  filterNames: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
  ) {
    const game = this.route.parent.snapshot.params.game;
    this.compendiumService = this.injector.get<CompendiumService>(
      serviceToken[game].compendium,
    );
    this.fusionService = this.injector.get<NormalFusionService>(
      serviceToken[game].normalFusion,
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.fusions = this.persona?.special
        ? []
        : this.fusionService.findFusions(this.persona);
    }, 0);
  }

  arcanaName(arcana: number) {
    return this.compendiumService.arcanaName(arcana);
  }

  addFilter(event: any) {
    const input: HTMLInputElement = event.input;
    const value: string = event.value.replace(/[^A-Za-z\'-\s]/g, '');

    if ((value || '').trim()) {
      this.filterNames.push(value);
      this.filter();
    }

    if (input) input.value = '';
  }

  removeFilter(index: number) {
    this.filterNames.splice(index, 1);
    this.filter();
  }

  private filter() {
    this.fusions = !this.filterNames.length
      ? this.fusionService.list
      : this.fusionService.list.filter((pair) =>
          pair.some((persona) =>
            this.filterNames.some((filterName) =>
              partialMatchRegExp(filterName).test(persona.name),
            ),
          ),
        );
  }
}
