import { Component, OnInit, Input } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { Skill } from '../../../models/skill';
import { partialMatchRegExp } from '../../../helpers/reg-exp-helpers';

@Component({
  selector: 'shared-dialog-all-skills-list',
  templateUrl: './dialog-all-skills-list.component.html',
  styleUrls: ['./dialog-all-skills-list.component.css'],
})
export class DialogAllSkillsListComponent implements OnInit {
  @Input('skillService') skillService: SkillService;
  @Input('learnedSkills') learnedSkills: Skill[];
  skills: Skill[];

  constructor() {}

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
        !this.learnedSkills.some(
          (fskill) => fskill.name === skill.name,
        ),
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
