import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../services/compendium.service';
import { Persona } from '../../models/persona';
import { TriangleFusionService } from '../../services/triangle-fusion.service';

@Component({
  selector: 'p3p-triangle-fusions',
  templateUrl: './triangle-fusions.component.html',
  styleUrls: ['./triangle-fusions.component.css'],
  providers: [TriangleFusionService],
})
export class TriangleFusionsComponent implements OnInit {
  persona: Persona;
  fusions: Persona[][];
  
  constructor(
    private route: ActivatedRoute,
    private compendiumService: CompendiumService,
    private fusionService: TriangleFusionService,
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe((p: object) => {
      this.persona = this.compendiumService.find(p['persona_name']);
      this.fusions = [];
      setTimeout(() => {
        this.fusions = this.persona?.special
          ? []
          : this.fusionService.findFusions(this.persona).slice(0,200);
      }, 0);
    });
  }
}
