import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { TriangleFusionService } from '../../../services/triangle-fusion.service';
import { P4G_COMPENDIUM } from '../../helpers/compendium-service-helper';
import {
  P4G_TRIANGLE_FUSION,
  p4gTriangleFusionProvider,
} from '../../helpers/triangle-fusion-service-helper';
import { TriangleFusionsComponent } from '../../../shared/triangle-fusions/triangle-fusions.component';

@Component({
  selector: 'p4g-triangle-fusions',
  templateUrl: '../../../shared/triangle-fusions/triangle-fusions.component.html',
  styleUrls: ['../../../shared/triangle-fusions/triangle-fusions.component.css'],
  providers: [p4gTriangleFusionProvider],
})
export class P4GTriangleFusionsComponent extends TriangleFusionsComponent {
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    @Inject(P4G_COMPENDIUM) protected compendiumService: CompendiumService,
    @Inject(P4G_TRIANGLE_FUSION) protected fusionService: TriangleFusionService,
  ) {
    super(route, router, compendiumService, fusionService);
  }
}
