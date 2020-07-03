import { Component, OnInit, Input, Injector } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { Skill } from '../../../models/skill';
import { partialMatchRegExp } from '../../../helpers/reg-exp-helpers';
import { ActiveGameService } from '../../../services/active-game.service';

@Component({
  selector: 'shared-dialog-all-skills-list',
  templateUrl: './dialog-all-skills-list.component.html',
  styleUrls: ['./dialog-all-skills-list.component.css'],
})
export class DialogAllSkillsListComponent implements OnInit {
  @Input('learnedSkills') learnedSkills: Skill[];
  skillService: SkillService;
  skills: Skill[];

  constructor(
    private activeGameService: ActiveGameService,
    private injector: Injector,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.skillService = this.injector.get<SkillService>(tokens.skill);
  }

  ngOnInit(): void {
    this.skills = this.skillService
      .getAll()
      .filter(
        (skill) =>
          !this.learnedSkills.some((fskill) => fskill.name === skill.name),
      );
  }

  add(skill: Skill): void {
    this.learnedSkills.push(skill);
    this.skills = this.skills.filter(
      (skill) =>
        !this.learnedSkills.some((fskill) => fskill.name === skill.name),
    );
  }

  clearFilter(): void {
    this.skills = this.skillService.getAll();
  }

  applyFilter(key: string): void {
    this.skills = this.skillService
      .getAll()
      .filter(
        (skill) =>
          partialMatchRegExp(key).test(skill.name) &&
          !this.learnedSkills.some((fskill) => fskill.name === skill.name),
      );
  }
}
