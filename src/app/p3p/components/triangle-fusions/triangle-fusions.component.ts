import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { TriangleFusionService } from '../../../services/triangle-fusion.service';
import { P3P_COMPENDIUM } from '../../helpers/compendium-service-helper';
import {
  P3P_TRIANGLE_FUSION,
  p3pTriangleFusionProvider,
} from '../../helpers/triangle-fusion-service-helper';
import { TriangleFusionsComponent } from '../../../shared/triangle-fusions/triangle-fusions.component';

@Component({
  selector: 'p3p-triangle-fusions',
  templateUrl: '../../../shared/triangle-fusions/triangle-fusions.component.html',
  styleUrls: ['../../../shared/triangle-fusions/triangle-fusions.component.css'],
  providers: [p3pTriangleFusionProvider],
})
export class P3PTriangleFusionsComponent extends TriangleFusionsComponent {
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    @Inject(P3P_COMPENDIUM) protected compendiumService: CompendiumService,
    @Inject(P3P_TRIANGLE_FUSION) protected fusionService: TriangleFusionService,
  ) {
    super(route, router, compendiumService, fusionService);
  }
}
