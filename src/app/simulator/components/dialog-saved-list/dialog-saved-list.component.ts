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
import { Persona } from '../../../models/persona';
import { FusionNode } from '../../../models/fusion-node';
import { StoredFusionNode } from '../../../models/stored-fusion-node';
import { partialMatchRegExp } from '../../../helpers/reg-exp-helpers';
import { FusionNodeHelper } from '../../helpers/fusion-node-helper';
import { PersonaStoreService } from '../../../services/persona-store.service';

@Component({
  selector: 'simulator-dialog-saved-list',
  templateUrl: './dialog-saved-list.component.html',
  styleUrls: ['./dialog-saved-list.component.css'],
})
export class DialogSavedListComponent implements OnInit {
  @Input('personaStore') personaStoreService: PersonaStoreService;
  @Output()
  changeSelected: EventEmitter<FusionNode | null> = new EventEmitter();
  @Output() dblClickSelection: EventEmitter<FusionNode> = new EventEmitter();

  list: StoredFusionNode[];

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
      (storedPersona: StoredFusionNode) => {
        return (
          partialMatchRegExp(filter).test(storedPersona.name) ||
          partialMatchRegExp(filter).test(storedPersona.data.persona.name)
        );
      },
    );
  }

  selectionChange(storedFusionNode: StoredFusionNode): void {
    this.changeSelected.emit(storedFusionNode.data);
  }

  dblClickSubmit(storedFusionNode: StoredFusionNode): void {
    this.dblClickSelection.emit(storedFusionNode.data);
  }
}
