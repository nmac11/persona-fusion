import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Injector,
} from '@angular/core';
import { Persona } from '../../models/persona';
import { FusionNode } from '../../models/fusion-node';
import { CompendiumService } from '../../services/compendium.service';
import { SkillService } from '../../services/skill.service';
import { partialMatchRegExp } from '../../helpers/reg-exp-helpers';
import { FusionNodeHelper } from '../../simulator/helpers/fusion-node-helper';
import { ActiveGameService } from '../../services/active-game.service';
import { Skill } from '../../models/skill';

interface FilteredPersona {
  persona: Persona;
  matchedSkills: Skill[];
}

@Component({
  selector: 'shared-dialog-persona-list',
  templateUrl: './dialog-persona-list.component.html',
  styleUrls: ['./dialog-persona-list.component.css'],
})
export class DialogPersonaListComponent implements OnInit {
  compendiumService: CompendiumService;
  fusionNodeHelper: FusionNodeHelper;

  @Output()
  changeSelected: EventEmitter<FusionNode | null> = new EventEmitter();
  @Output() dblClickSelection: EventEmitter<FusionNode> = new EventEmitter();

  list: FilteredPersona[];

  constructor(
    private injector: Injector,
    private activeGameService: ActiveGameService,
  ) {
    this.fetchServices();
  }

  ngOnInit(): void {
    this.loadFromCompendium();
  }

  clearFilter(): void {
    this.loadFromCompendium();
  }

  private loadFromCompendium(): void {
    this.list = this.compendiumService.getAll().map((p) => {
      return { persona: p, matchedSkills: [] };
    });
  }

  applyFilter(filter: string): void {
    if (filter === '')
      this.list = this.compendiumService.getAll().map((p) => {
        return { persona: p, matchedSkills: [] };
      });
    else
      this.list = this.compendiumService.getAll().reduce((res, p: Persona) => {
        const matchedName = partialMatchRegExp(filter).test(p.name);
        const matchedSkills = p.skills.filter((s) =>
          partialMatchRegExp(filter).test(s.name),
        );
        if (matchedName) res.unshift({ persona: p, matchedSkills });
        else if (matchedSkills.length > 0)
          res.push({ persona: p, matchedSkills });
        return res;
      }, []);
  }

  matchedSkills(skills: Skill[]): string {
    return skills
      .map((s) => {
        const levelSuffix = s.level > 0 ? ` (${s.level})` : '';
        return s.name + levelSuffix;
      })
      .join(', ');
  }

  selectionChange(persona: Persona): void {
    const fusionNode = this.fusionNodeHelper.createFusionNode(persona);
    this.changeSelected.emit(fusionNode);
  }

  dblClickSubmit(persona: Persona): void {
    const fusionNode = this.fusionNodeHelper.createFusionNode(persona);
    this.dblClickSelection.emit(fusionNode);
  }

  private fetchServices(): void {
    const tokens = this.activeGameService.getTokenSet();
    this.compendiumService = this.injector.get<CompendiumService>(
      tokens.compendium,
    );
    const skillService = this.injector.get<SkillService>(tokens.skill);
    this.fusionNodeHelper = new FusionNodeHelper(
      this.compendiumService,
      skillService,
    );
  }
}
