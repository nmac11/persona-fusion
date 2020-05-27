import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { P3FES_COMPENDIUM } from '../../helpers/compendium-service-helper';
import { FusionsComponent } from '../../../shared/fusions/fusions.component';

@Component({
  selector: 'p3fes-fusions',
  templateUrl: '../../../shared/fusions/fusions.component.html',
  styleUrls: ['../../../shared/fusions/fusions.component.css'],
})
export class P3FESFusionsComponent extends FusionsComponent {
  constructor(
    protected route: ActivatedRoute,
    @Inject(P3FES_COMPENDIUM) protected compendiumService: CompendiumService,
  ) {
    super(route, compendiumService);
  }
}
