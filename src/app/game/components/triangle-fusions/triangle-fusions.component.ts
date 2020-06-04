import { Component, OnInit, Injector, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { partialMatchRegExp } from '../../../helpers/reg-exp-helpers';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { TriangleFusionService } from '../../../services/triangle-fusion.service';
import { p3pTriangleFusionProvider } from '../../../tokens/p3p/triangle-fusion-service-token';
import { p3fesTriangleFusionProvider } from '../../../tokens/p3fes/triangle-fusion-service-token';
import { p4gTriangleFusionProvider } from '../../../tokens/p4g/triangle-fusion-service-token';
import { serviceToken } from '../../../helpers/service-token-helper';

@Component({
  selector: 'game-triangle-fusions',
  templateUrl: './triangle-fusions.component.html',
  styleUrls: ['./triangle-fusions.component.css'],
  providers: [
    p3pTriangleFusionProvider,
    p3fesTriangleFusionProvider,
    p4gTriangleFusionProvider,
  ],
})
export class TriangleFusionsComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fusions: Persona[][];
  availablePersonae: Persona[] = [];
  fusionService: TriangleFusionService;
  selectedPersonae: Persona[] = [];
  compendiumService: CompendiumService;
  @Input('persona') persona: Persona;
  nameFilters: string[] = [];

  constructor(private route: ActivatedRoute, private injector: Injector) {
    const game = this.route.parent.snapshot.params.game;
    this.compendiumService = this.injector.get<CompendiumService>(
      serviceToken[game].compendium,
    );
    this.fusionService = this.injector.get<TriangleFusionService>(
      serviceToken[game].triangleFusion,
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.fusions = this.persona?.special
        ? []
        : this.fusionService.findFusions(this.persona);

      this.availablePersonae = this.fusionService
        .fusionPersonae()
        .sort((a, b) => a.level - b.level);
    }, 0);
  }

  arcanaName(arcana: number): string {
    return this.compendiumService.arcanaName(arcana);
  }

  addFilter(persona: Persona): void {
    if (!this.selectedPersonae.some((p) => p.id === persona.id))
      this.selectedPersonae.push(persona);
    this.filter();
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

  filter(): void {
    this.availablePersonae = this.fusions
      .filter(this.includesEveryFilterPersona)
      .reduce(this.availablePersonaeReducer, new Array<Persona>())
      .filter((p) => {
        return this.nameFilters.length
          ? this.nameFilters.some((nf) => partialMatchRegExp(nf).test(p.name))
          : true;
      })
      .sort((a, b) => a.level - b.level);
  }

  private includesEveryFilterPersona: (fusion: Persona[]) => boolean = (
    fusion,
  ) =>
    this.selectedPersonae.every((filter) =>
      fusion.some((p) => p.id === filter.id),
    );

  private availablePersonaeReducer: (
    results: Persona[],
    fusion: Persona[],
  ) => Persona[] = (results, fusion) => {
    const toAdd: Persona[] = fusion.filter(
      (fp) =>
        !results.some((p) => fp.id === p.id) &&
        !this.selectedPersonae.some((p) => fp.id === p.id),
    );
    results.push(...toAdd);
    return results;
  };
}
