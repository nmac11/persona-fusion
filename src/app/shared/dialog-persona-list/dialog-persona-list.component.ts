import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Persona } from '../../models/persona';
import { FusionNode } from '../../models/fusion-node';
import { CompendiumService } from '../../services/compendium.service';
import { partialMatchRegExp } from '../../helpers/reg-exp-helpers';
import { FusionNodeHelper } from '../../simulator/helpers/fusion-node-helper'

@Component({
  selector: 'shared-dialog-persona-list',
  templateUrl: './dialog-persona-list.component.html',
  styleUrls: ['./dialog-persona-list.component.css'],
})
export class DialogPersonaListComponent implements OnInit {
  @Input('compendium') compendiumService: CompendiumService;
  @Input('fusionNodeHelper') fusionNodeHelper: FusionNodeHelper;
  @Output() changeSelected: EventEmitter<FusionNode | null> = new EventEmitter();
  @Output() dblClickSelection: EventEmitter<FusionNode> = new EventEmitter();

  list: Persona[];

  constructor() {}

  ngOnInit(): void {
    this.list = this.compendiumService.getAll();
  }

  clearFilter(): void {
    this.list = this.compendiumService.getAll();
  }

  applyFilter(filter: string): void {
    this.list = this.compendiumService
      .getAll()
      .filter((persona: Persona) =>
        partialMatchRegExp(filter).test(persona.name),
      );
  }

  selectionChange(persona: Persona): void {
    const fusionNode = this.fusionNodeHelper.createFusionNode(persona);
    this.changeSelected.emit(fusionNode);
  }

  dblClickSubmit(persona: Persona): void {
    const fusionNode = this.fusionNodeHelper.createFusionNode(persona);
    this.dblClickSelection.emit(fusionNode);
  }
}
