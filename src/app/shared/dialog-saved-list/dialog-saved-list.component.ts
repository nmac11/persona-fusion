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
import { ActiveGameService } from '../../services/active-game.service';
import { Skill } from '../../models/skill';

interface FilteredFusionNode {
  fusionNode: FusionNode;
  matchedSkills: Skill[];
}

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

  list: FilteredFusionNode[];

  constructor(
    private activeGameService: ActiveGameService,
    private injector: Injector,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.personaStoreService = this.injector.get<PersonaStoreService>(
      tokens.personaStore,
    );
  }

  ngOnInit(): void {
    this.loadList();
  }

  skillsSummary(filteredFusionNode: FilteredFusionNode): string {
    const skills =
      filteredFusionNode.matchedSkills.length === 0
        ? filteredFusionNode.fusionNode.skills
        : filteredFusionNode.matchedSkills;

    return skills.map((s) => s.name).join(', ');
  }

  async loadList(): Promise<void> {
    this.list = (await this.personaStoreService.loadAll()).map(
      this.filterFunction,
    );
  }

  async clearFilter(): Promise<void> {
    await this.loadList();
  }

  async applyFilter(filter: string): Promise<void> {
    if (filter === '') this.loadList();
    else
      this.list = (await this.personaStoreService.loadAll()).reduce(
        (res, f) => {
          const matchedName =
            partialMatchRegExp(filter).test(f.persona.name) ||
            partialMatchRegExp(filter).test(f.saveName);
          const matchedSkills = f.skills.filter((s) =>
            partialMatchRegExp(filter).test(s.name),
          );
          if (matchedName) res.unshift({ fusionNode: f, matchedSkills });
          else if (matchedSkills.length > 0)
            res.push({ fusionNode: f, matchedSkills });
          return res;
        },
        [],
      );
  }

  selectionChange(filteredFusionNode: FilteredFusionNode): void {
    this.changeSelected.emit(filteredFusionNode.fusionNode);
  }

  dblClickSubmit(filteredFusionNode: FilteredFusionNode): void {
    this.dblClickSelection.emit(filteredFusionNode.fusionNode);
  }

  private filterFunction: (f: FusionNode) => FilteredFusionNode = (f) => {
    return {
      fusionNode: f,
      matchedSkills: f.skills,
    };
  };
}
