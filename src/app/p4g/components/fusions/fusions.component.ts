import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { P4G_COMPENDIUM } from '../../helpers/compendium-service-helper';
import { FusionsComponent } from '../../../shared/fusions/fusions.component';

@Component({
  selector: 'p4g-fusions',
  templateUrl: '../../../shared/fusions/fusions.component.html',
  styleUrls: ['../../../shared/fusions/fusions.component.css'],
})
export class P4GFusionsComponent extends FusionsComponent {
  constructor(
    protected route: ActivatedRoute,
    @Inject(P4G_COMPENDIUM) protected compendiumService: CompendiumService,
  ) {
    super(route, compendiumService);
  }
}
