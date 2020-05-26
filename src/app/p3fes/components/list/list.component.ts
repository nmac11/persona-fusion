import { Component, OnInit, Inject } from '@angular/core';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import Arcana from '../../../data/p3/p3-arcana.json';
import { P3FES_COMPENDIUM } from '../../helpers/compendium-service-helper';

@Component({
  selector: 'p3fes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  readonly Arcana = Arcana;
  personae: Array<Persona>;

  constructor(
    @Inject(P3FES_COMPENDIUM) private compendiumService: CompendiumService,
  ) {
    this.personae = compendiumService.getAll();
  }

  ngOnInit(): void {}
}