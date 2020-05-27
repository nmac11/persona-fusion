import { Component, Inject } from '@angular/core';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { P4G_COMPENDIUM } from '../../helpers/compendium-service-helper';
import { ListComponent } from '../../../shared/list/list.component';

@Component({
  selector: 'p4g-list',
  templateUrl: '../../../shared/list/list.component.html',
  styleUrls: ['../../../shared/list/list.component.css'],
})
export class P4GListComponent extends ListComponent {
  constructor(
    @Inject(P4G_COMPENDIUM) protected compendiumService: CompendiumService,
  ) {
    super(compendiumService);
  }
}
