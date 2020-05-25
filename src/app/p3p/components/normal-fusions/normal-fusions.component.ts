import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  fusions: Persona[][];
  fusionPersonae: Persona[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compendiumService: CompendiumService,
    private fusionService: NormalFusionService,
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
}
