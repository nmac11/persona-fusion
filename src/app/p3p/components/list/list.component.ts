import { Component, OnInit } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { Persona } from '../../models/persona';
import Arcana from '../../data/p3p-arcana.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  readonly Arcana = Arcana;
  personae: Array<Persona>;

  constructor(private compendium: CompendiumService) {
    this.personae = compendium.getAll();
  }

  ngOnInit(): void {}
}
