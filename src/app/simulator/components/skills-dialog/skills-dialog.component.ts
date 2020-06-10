import {
  Component,
  OnInit,
  AfterViewInit,
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

@Component({
  selector: 'simulator-skills-dialog',
  templateUrl: './skills-dialog.component.html',
  styleUrls: ['./skills-dialog.component.css'],
})
export class SkillsDialogComponent implements OnInit, AfterViewInit {
  skills: Skill[];
  @ViewChild('filterField') filterField: ElementRef;

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

  ngAfterViewInit(): void {
    fromEvent(this.filterField.nativeElement, 'keyup')
      .pipe(debounceTime(200))
      .subscribe((k: KeyboardEvent) =>
        this.applyFilter(this.filterField.nativeElement.value),
      );
  }

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

  private applyFilter(key: string = ''): void {
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
