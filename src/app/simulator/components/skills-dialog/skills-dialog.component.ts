import {
  Component,
  OnInit,
  Inject,
  Injector,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../../models/persona';
import { Skill } from '../../../models/skill';
import { FusionNode } from '../../../models/fusion-node';
import { SkillService } from '../../../services/skill.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { partialMatchRegExp } from '../../../helpers/reg-exp-helpers';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'simulator-skills-dialog',
  templateUrl: './skills-dialog.component.html',
  styleUrls: ['./skills-dialog.component.css'],
})
export class SkillsDialogComponent implements OnInit {
  skills: Skill[];

  constructor(
    public dialogRef: MatDialogRef<SkillsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { fusionItem: FusionNode; skillService: SkillService },
  ) {
    this.skills = data.skillService
      .getAll()
      .filter(
        (skill) =>
          !this.data.fusionItem.skills.some(
            (fskill) => fskill.name === skill.name,
          ),
      );
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  remove(index: number): void {
    this.data.fusionItem.skills.splice(index, 1);
  }

  add(skill: Skill): void {
    this.data.fusionItem.skills.push(skill);
    this.skills = this.skills.filter(
      (skill) =>
        !this.data.fusionItem.skills.some(
          (fskill) => fskill.name === skill.name,
        ),
    );
  }

  drop(event: CdkDragDrop<Skill[]>): void {
    moveItemInArray(this.data.fusionItem.skills, event.previousIndex, event.currentIndex);
  }

  clearFilter() {
    this.skills = this.data.skillService.getAll();
  }

  applyFilter(key: string = ''): void {
    this.skills = this.data.skillService
      .getAll()
      .filter(
        (skill) =>
          partialMatchRegExp(key).test(skill.name) &&
          !this.data.fusionItem.skills.some(
            (fskill) => fskill.name === skill.name,
          ),
      );
  }
}
