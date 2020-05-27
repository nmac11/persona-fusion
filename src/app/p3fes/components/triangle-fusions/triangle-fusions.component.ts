import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { TriangleFusionService } from '../../../services/triangle-fusion.service';
import { P3FES_COMPENDIUM } from '../../helpers/compendium-service-helper';
import {
  P3FES_TRIANGLE_FUSION,
  p3fesTriangleFusionProvider,
} from '../../helpers/triangle-fusion-service-helper';
import { TriangleFusionsComponent } from '../../../shared/triangle-fusions/triangle-fusions.component';

@Component({
  selector: 'p3fes-triangle-fusions',
  templateUrl: '../../../shared/triangle-fusions/triangle-fusions.component.html',
  styleUrls: ['../../../shared/triangle-fusions/triangle-fusions.component.css'],
  providers: [p3fesTriangleFusionProvider],
})
export class P3FESTriangleFusionsComponent extends TriangleFusionsComponent {
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    @Inject(P3FES_COMPENDIUM) protected compendiumService: CompendiumService,
    @Inject(P3FES_TRIANGLE_FUSION) protected fusionService: TriangleFusionService,
  ) {
    super(route, router, compendiumService, fusionService);
  }
}
