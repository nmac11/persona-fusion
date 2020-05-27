import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { NormalFusionService } from '../../../services/normal-fusion.service';
import { P3P_COMPENDIUM } from '../../helpers/compendium-service-helper';
import {
  P3P_NORMAL_FUSION,
  p3pNormalFusionProvider,
} from '../../helpers/normal-fusion-service-helper';
import { NormalFusionsComponent } from '../../../shared/normal-fusions/normal-fusions.component';

@Component({
  selector: 'p3p-normal-fusions',
  templateUrl: '../../../shared/normal-fusions/normal-fusions.component.html',
  styleUrls: ['../../../shared/normal-fusions/normal-fusions.component.css'],
  providers: [p3pNormalFusionProvider],
})
export class P3PNormalFusionsComponent extends NormalFusionsComponent {
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    @Inject(P3P_COMPENDIUM) protected compendiumService: CompendiumService,
    @Inject(P3P_NORMAL_FUSION) protected fusionService: NormalFusionService,
  ) {
    super(route, router, compendiumService, fusionService);
  }
}
