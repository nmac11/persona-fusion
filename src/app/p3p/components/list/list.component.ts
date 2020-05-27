import { Component, Inject } from '@angular/core';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { P3P_COMPENDIUM } from '../../helpers/compendium-service-helper';
import { ListComponent } from '../../../shared/list/list.component';

@Component({
  selector: 'p3p-list',
  templateUrl: '../../../shared/list/list.component.html',
  styleUrls: ['../../../shared/list/list.component.css'],
})
export class P3PListComponent extends ListComponent {
  constructor(
    @Inject(P3P_COMPENDIUM) protected compendiumService: CompendiumService,
  ) {
    super(compendiumService);
  }
}
