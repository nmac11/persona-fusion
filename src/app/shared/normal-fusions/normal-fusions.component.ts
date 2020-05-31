import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../services/compendium.service';
import { Persona } from '../../models/persona';
import { NormalFusionService } from '../../services/normal-fusion.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { partialMatchRegExp } from '../../helpers/reg-exp-helpers';

export class NormalFusionsComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  persona: Persona;
  fusions: Persona[][];
  fusionPersonae: Persona[];
  filterNames: string[] = [];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected compendiumService: CompendiumService,
    protected fusionService: NormalFusionService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const personaName = this.route.parent.snapshot.params['persona_name'];
    this.persona = this.compendiumService.find(personaName);
    setTimeout(() => {
      this.fusions = this.persona?.special
        ? []
        : this.fusionService.findFusions(this.persona);

      this.fusionPersonae = Array.from(
        this.fusionService.fusionPersonaIds,
      ).map((id) => this.compendiumService.findById(id));
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
    console.log(this.filterNames);
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
