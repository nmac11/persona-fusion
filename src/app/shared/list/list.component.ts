import { OnInit } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { Persona } from '../../models/persona';

export class ListComponent implements OnInit {
  personae: Array<Persona>;

  constructor(
    protected compendiumService: CompendiumService,
  ) {
    this.personae = compendiumService.getAll();
  }

  ngOnInit(): void {}

  arcanaName(arcana: number) {
    return this.compendiumService.arcanaName(arcana);
  }
}
