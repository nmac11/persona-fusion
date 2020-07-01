import {
  Component,
  OnInit,
  Input,
  Injector,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FusionNode } from '../../models/fusion-node';
import { Persona } from '../../models/persona';
import { SkillsDialogComponent } from '../skills-dialog/skills-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SkillService } from '../../services/skill.service';
import { serviceToken } from '../../helpers/service-token-helper';

@Component({
  selector: 'shared-fusion-item',
  templateUrl: './fusion-item.component.html',
  styleUrls: ['./fusion-item.component.css'],
})
export class FusionItemComponent implements OnInit {
  @Input('fusionItem') fusionItem: FusionNode;
  @Output() change: EventEmitter<any> = new EventEmitter();

  skillService: SkillService;

  constructor(
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private injector: Injector,
  ) {
    const game = this.route.parent.snapshot.params.game;
    this.skillService = this.injector.get<SkillService>(
      serviceToken[game].skill,
    );
  }

  ngOnInit(): void {}

  onChange(): void {
    this.change.emit(null);
  }

  editSkills(): void {
    const dialogRef = this.matDialog.open(SkillsDialogComponent, {
      data: { fusionItem: this.fusionItem, skillService: this.skillService },
      panelClass: 'simulator-skill-list-overlay-pane',
    });
    dialogRef.afterClosed().subscribe(() => this.onChange());
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
