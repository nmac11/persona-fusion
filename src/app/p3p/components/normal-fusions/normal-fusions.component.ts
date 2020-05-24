import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../services/compendium.service';
import { Persona } from '../../models/persona';
import { NormalFusionService } from '../../services/normal-fusion.service';

@Component({
  selector: 'p3p-normal-fusions',
  templateUrl: './normal-fusions.component.html',
  styleUrls: ['./normal-fusions.component.css'],
  providers: [NormalFusionService],
})
export class NormalFusionsComponent implements OnInit {
  persona: Persona;
  fusions: Array<Array<Persona>>;

  constructor(
    private route: ActivatedRoute,
    private compendiumService: CompendiumService,
    private fusionService: NormalFusionService,
  ) {
    const personaName = this.route.snapshot.paramMap.get('persona_name');
    this.persona = this.compendiumService.find(personaName);
    this.fusions = this.fusionService.findFusions(this.persona);
  }

  ngOnInit(): void {
    this.route.params.subscribe((p: object) => {
      this.persona = this.compendiumService.find(p['persona_name']);
      this.fusions = this.fusionService.findFusions(this.persona);
    });
  }
}
