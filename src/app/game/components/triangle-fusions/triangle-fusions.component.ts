import { Component, OnInit, Injector, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { TriangleFusionService } from '../../../services/triangle-fusion.service';
import { p3pTriangleFusionProvider } from '../../../tokens/p3p/triangle-fusion-service-token';
import { p3fesTriangleFusionProvider } from '../../../tokens/p3fes/triangle-fusion-service-token';
import { p4gTriangleFusionProvider } from '../../../tokens/p4g/triangle-fusion-service-token';
import { serviceToken } from '../../../helpers/service-token-helper';

@Component({
  selector: 'game-triangle-fusions',
  templateUrl: './triangle-fusions.component.html',
  styleUrls: ['./triangle-fusions.component.css'],
  providers: [
    p3pTriangleFusionProvider,
    p3fesTriangleFusionProvider,
    p4gTriangleFusionProvider,
  ],
})
export class TriangleFusionsComponent implements OnInit {
  fusions: Persona[][];
  fusionPersonae: Persona[];
  fusionService: TriangleFusionService;
  filters = [];
  compendiumService: CompendiumService;
  @Input('persona') persona: Persona;

  constructor(private route: ActivatedRoute, private injector: Injector) {
    const game = this.route.parent.snapshot.params.game;
    this.compendiumService = this.injector.get<CompendiumService>(
      serviceToken[game].compendium,
    );
    this.fusionService = this.injector.get<TriangleFusionService>(
      serviceToken[game].triangleFusion,
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.fusions = this.persona?.special
        ? []
        : this.fusionService.findFusions(this.persona);

      this.fusionPersonae = this.fusionService.fusionPersonae();
    }, 0);
  }

  arcanaName(arcana: number): string {
    return this.compendiumService.arcanaName(arcana);
  }

  filter(): void {
    this.fusionPersonae = Array.from(
      this.fusions
        .filter((fusion) =>
          this.filters.every((filter) => fusion.some((p) => p.id === filter)),
        )
        .reduce((results, fusion) => {
          const ids = fusion.map((p) => p.id);
          ids.forEach((id) => results.add(id));
          return results;
        }, new Set()),
    ).map((n: number) => this.compendiumService.findById(n));
  }
}
