import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../services/compendium.service';
import { Persona } from '../../models/persona';

export class FusionsComponent implements OnInit {
  persona: Persona;

  constructor(
    protected route: ActivatedRoute,
    protected compendiumService: CompendiumService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p: object) => {
      this.persona = this.compendiumService.find(p['persona_name']);
    });
  }

  arcanaName(arcana: number) {
    return this.compendiumService.arcanaName(arcana);
  }
}
