import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { NormalFusionService } from '../../../services/normal-fusion.service';
import { P4G_COMPENDIUM } from '../../helpers/compendium-service-helper';
import {
  P4G_NORMAL_FUSION,
  p4gNormalFusionProvider,
} from '../../helpers/normal-fusion-service-helper';
import { NormalFusionsComponent } from '../../../shared/normal-fusions/normal-fusions.component';

@Component({
  selector: 'p4g-normal-fusions',
  templateUrl: '../../../shared/normal-fusions/normal-fusions.component.html',
  styleUrls: ['../../../shared/normal-fusions/normal-fusions.component.css'],
  providers: [p4gNormalFusionProvider],
})
export class P4GNormalFusionsComponent extends NormalFusionsComponent {
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    @Inject(P4G_COMPENDIUM) protected compendiumService: CompendiumService,
    @Inject(P4G_NORMAL_FUSION) protected fusionService: NormalFusionService,
  ) {
    super(route, router, compendiumService, fusionService);
  }
}
