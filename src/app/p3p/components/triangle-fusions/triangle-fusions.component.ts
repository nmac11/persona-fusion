import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { TriangleFusionService } from '../../../services/triangle-fusion.service';
import { P3P_COMPENDIUM } from '../../helpers/compendium-service-helper';
import { P3P_TRIANGLE_FUSION, p3pTriangleFusionProvider} from '../../helpers/triangle-fusion-service-helper';

@Component({
  selector: 'p3p-triangle-fusions',
  templateUrl: './triangle-fusions.component.html',
  styleUrls: ['./triangle-fusions.component.css'],
  providers: [p3pTriangleFusionProvider],
})
export class TriangleFusionsComponent implements OnInit {
  persona: Persona;
  fusions: Persona[][];
  fusionPersonae: Persona[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(P3P_COMPENDIUM) private compendiumService: CompendiumService,
    @Inject(P3P_TRIANGLE_FUSION) private fusionService: TriangleFusionService,
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

      this.fusionService.findFusions(this.persona);
      this.fusionPersonae = Array.from(
        this.fusionService.fusionPersonaIds,
      ).map((id) => this.compendiumService.findById(id));
    }, 0);
  }
}
