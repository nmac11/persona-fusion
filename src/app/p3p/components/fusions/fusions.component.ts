import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { P3P_COMPENDIUM } from '../../helpers/compendium-service-helper';
import { FusionsComponent } from '../../../shared/fusions/fusions.component';

@Component({
  selector: 'p3p-fusions',
  templateUrl: '../../../shared/fusions/fusions.component.html',
  styleUrls: ['../../../shared/fusions/fusions.component.css'],
})
export class P3PFusionsComponent extends FusionsComponent {
  constructor(
    protected route: ActivatedRoute,
    @Inject(P3P_COMPENDIUM) protected compendiumService: CompendiumService,
  ) {
    super(route, compendiumService);
  }
}
