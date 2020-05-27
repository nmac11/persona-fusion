import { Component, Inject } from '@angular/core';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { P3FES_COMPENDIUM } from '../../helpers/compendium-service-helper';
import { ListComponent } from '../../../shared/list/list.component';

@Component({
  selector: 'p3fes-list',
  templateUrl: '../../../shared/list/list.component.html',
  styleUrls: ['../../../shared/list/list.component.css'],
})
export class P3FESListComponent extends ListComponent {
  constructor(
    @Inject(P3FES_COMPENDIUM) protected compendiumService: CompendiumService,
  ) {
    super(compendiumService);
  }
}
