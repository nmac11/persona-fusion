import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { P3P_COMPENDIUM } from '../../helpers/compendium-service-helper';

@Component({
  selector: 'p3p-fusions',
  templateUrl: './fusions.component.html',
  styleUrls: ['./fusions.component.css'],
})
export class FusionsComponent implements OnInit {
  persona: Persona;

  constructor(
    private route: ActivatedRoute,
    @Inject(P3P_COMPENDIUM) private compendiumService: CompendiumService,
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
