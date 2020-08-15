import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FusionNode } from '../../models/fusion-node';
import { Persona } from '../../models/persona';
import { SkillsDialogComponent } from '../skills-dialog/skills-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Skill } from '../../models/skill';

@Component({
  selector: 'shared-fusion-item',
  templateUrl: './fusion-item.component.html',
  styleUrls: ['./fusion-item.component.css'],
})
export class FusionItemComponent implements OnInit {
  @Input('fusionItem') fusionItem: FusionNode;
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  onChange(): void {
    this.update.emit(null);
  }

  editSkills(): void {
    const dialogRef = this.matDialog.open(SkillsDialogComponent, {
      data: { fusionItem: this.fusionItem },
      panelClass: 'simulator-skill-list-overlay-pane',
    });
    dialogRef.afterClosed().subscribe(() => this.onChange());
  }

  skillsToLearn(): Skill[] {
    return this.fusionItem.persona.skills.filter(
      (s) =>
        s.level > this.fusionItem.currentLevel &&
        !this.fusionItem.skills.some((fs) => fs.name === s.name),
    );
  }

  changeLevel(inputLevel: string): void {
    const previousLevel = this.fusionItem.currentLevel;
    this.setLevel(+inputLevel);
    this.updateSkills(previousLevel);
    this.onChange();
  }

  private setLevel(level: number): void {
    if (level > 99) this.fusionItem.currentLevel = 99;
    else if (level < this.fusionItem.persona.level)
      this.fusionItem.currentLevel = this.fusionItem.persona.level;
    else this.fusionItem.currentLevel = level;
  }

  private updateSkills(previousLevel: number): void {
    const currentLevel = this.fusionItem.currentLevel;
    if (currentLevel > previousLevel)
      this.learnSkills(previousLevel, currentLevel);
    else this.unlearnSkills(previousLevel, currentLevel);
  }

  private learnSkills(previousLevel: number, currentLevel: number) {
    const acquiredSkills = this.fusionItem.persona.skills.filter(
      (skill) =>
        skill.level > previousLevel &&
        skill.level <= currentLevel &&
        !this.fusionItem.skills.some(
          (learnedSkill) => learnedSkill.name === skill.name,
        ),
    );
    this.fusionItem.skills.push(...acquiredSkills);
  }

  private unlearnSkills(previousLevel: number, currentLevel: number) {
    this.fusionItem.skills = this.fusionItem.skills.filter(
      (skill) => skill.level <= currentLevel || !skill.level,
    );
  }
}
