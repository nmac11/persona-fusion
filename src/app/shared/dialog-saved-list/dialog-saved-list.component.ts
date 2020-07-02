import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Injector,
} from '@angular/core';
import { Persona } from '../../models/persona';
import { FusionNode } from '../../models/fusion-node';
import { partialMatchRegExp } from '../../helpers/reg-exp-helpers';
import { PersonaStoreService } from '../../services/persona-store.service';
import { ActivatedRoute } from '@angular/router';
import { serviceToken } from '../../helpers/service-token-helper';

@Component({
  selector: 'shared-dialog-saved-list',
  templateUrl: './dialog-saved-list.component.html',
  styleUrls: ['./dialog-saved-list.component.css'],
})
export class DialogSavedListComponent implements OnInit {
  personaStoreService: PersonaStoreService;
  @Output()
  changeSelected: EventEmitter<FusionNode | null> = new EventEmitter();
  @Output() dblClickSelection: EventEmitter<FusionNode> = new EventEmitter();

  list: FusionNode[];

  constructor(private route: ActivatedRoute, private injector: Injector) {
    const game = this.route.firstChild.snapshot.params.game;
    this.personaStoreService = this.injector.get<PersonaStoreService>(
      serviceToken[game].personaStore,
    );
  }

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
