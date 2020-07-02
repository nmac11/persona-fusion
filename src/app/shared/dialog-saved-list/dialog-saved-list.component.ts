import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Persona } from '../../models/persona';
import { FusionNode } from '../../models/fusion-node';
import { partialMatchRegExp } from '../../helpers/reg-exp-helpers';
import { FusionNodeHelper } from '../../simulator/helpers/fusion-node-helper';
import { PersonaStoreService } from '../../services/persona-store.service';

@Component({
  selector: 'shared-dialog-saved-list',
  templateUrl: './dialog-saved-list.component.html',
  styleUrls: ['./dialog-saved-list.component.css'],
})
export class DialogSavedListComponent implements OnInit {
  @Input('personaStore') personaStoreService: PersonaStoreService;
  @Output()
  changeSelected: EventEmitter<FusionNode | null> = new EventEmitter();
  @Output() dblClickSelection: EventEmitter<FusionNode> = new EventEmitter();

  list: FusionNode[];

  constructor() {}

  ngOnInit(): void {
    this.loadList();
  }

  async loadList(): Promise<void> {
    this.list = await this.personaStoreService.loadAll();
  }

  async clearFilter(): Promise<void> {
    await this.loadList();
  }

  async applyFilter(filter: string): Promise<void> {
    this.list = (await this.personaStoreService.loadAll()).filter(
      (storedPersona: FusionNode) => {
        return (
          partialMatchRegExp(filter).test(storedPersona.saveName) ||
          partialMatchRegExp(filter).test(storedPersona.persona.name)
        );
      },
    );
  }

  selectionChange(storedFusionNode: FusionNode): void {
    this.changeSelected.emit(storedFusionNode);
  }

  dblClickSubmit(storedFusionNode: FusionNode): void {
    this.dblClickSelection.emit(storedFusionNode);
  }
}
