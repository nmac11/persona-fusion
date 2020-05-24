import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../services/compendium.service';
import { Persona } from '../../models/persona';
import Arcana from '../../data/p3p-arcana.json';

@Component({
  selector: 'p3p-fusions',
  templateUrl: './fusions.component.html',
  styleUrls: ['./fusions.component.css'],
})
export class FusionsComponent implements OnInit {
  readonly Arcana = Arcana;
  persona: Persona;

  constructor(
    private route: ActivatedRoute,
    private compendiumService: CompendiumService,
  ) {
    const personaName = this.route.snapshot.paramMap.get('persona_name');
    this.persona = this.compendiumService.find(personaName);
  }

  ngOnInit(): void {}
}
