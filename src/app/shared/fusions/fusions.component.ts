import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../services/compendium.service';
import { Persona } from '../../models/persona';
import { Observer, Observable } from 'rxjs';

export class FusionsComponent implements OnInit {
  persona: Persona;
  specialFusions: Persona[] = []

  constructor(
    protected route: ActivatedRoute,
    protected compendiumService: CompendiumService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p: object) => {
      this.persona = this.compendiumService.find(p['persona_name']);
      if (this.persona?.special) {
        this.specialFusions = this.compendiumService.getSpecialFusions(
          this.persona,
        );
      }
    });
  }

  arcanaName(arcana: number) {
    return this.compendiumService.arcanaName(arcana);
  }
}
