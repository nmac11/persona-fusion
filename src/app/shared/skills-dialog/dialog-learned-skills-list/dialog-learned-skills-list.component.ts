import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../../../models/skill';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'shared-dialog-learned-skills-list',
  templateUrl: './dialog-learned-skills-list.component.html',
  styleUrls: ['./dialog-learned-skills-list.component.css'],
})
export class DialogLearnedSkillsListComponent implements OnInit {
  @Input('skills') skills: Skill[];

  constructor() {}

  ngOnInit(): void {}

  remove(index: number): void {
    this.skills.splice(index, 1);
  }

  drop(event: CdkDragDrop<Skill[]>): void {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }
}
