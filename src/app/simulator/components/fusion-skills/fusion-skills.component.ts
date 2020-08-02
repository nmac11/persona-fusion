import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FusionResult } from '../../../models/fusion-result';
import { ActiveGameService } from '../../../services/active-game.service';
import { InheritableSkill } from '../../../models/inheritable-skill';
import { AppSettingsService } from '../../../services/app-settings.service';
import { Skill } from '../../../models/skill';
import { countSkillPicks } from '../../../helpers/count-skill-picks-helper';
import { Probabilities } from '../../../lib/probabilities';

@Component({
  selector: 'simulator-fusion-skills',
  templateUrl: './fusion-skills.component.html',
  styleUrls: ['./fusion-skills.component.css'],
})
export class FusionSkillsComponent implements OnInit, OnChanges {
  @Input('fusionYield') fusionYield: FusionResult;
  showProbabilities: boolean;

  constructor(
    private activeGameService: ActiveGameService,
    private appSettingsService: AppSettingsService,
  ) {
    this.showProbabilities = this.appSettingsService.getValues()['PROBABILITY'];
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.calculateProbabilities();
  }

  randomInheritance(): boolean {
    return ['p3p', 'p3fes', 'p3ans', 'p4'].includes(
      this.activeGameService.game,
    );
  }

  approximateProbabilities(): boolean {
    const ratios = this.fusionYield.inheritableSkills
      .map((s) => s.probRatio)
      .filter((r) => r > 0);
    const variableRatios = Array.from(new Set(ratios)).length !== 1;
    const moreThanFivePicks = this.fusionYield.skillsInheritedCount > 5;
    return variableRatios && moreThanFivePicks;
  }

  private async calculateProbabilities(): Promise<void> {
    if (!this.showProbabilities) return;
    const ratios = this.fusionYield.inheritableSkills.map(
      (skill) => skill.probRatio,
    );
    const probabilities = await new Probabilities(
      ratios,
      countSkillPicks(
        this.fusionYield.persona,
        this.fusionYield.fusionComponents,
      ),
    ).calculate();
    this.fusionYield.inheritableSkills.forEach(
      (s) => (s.probability = probabilities[s.probRatio]),
    );
  }

  skillsToLearn(): Skill[] {
    return this.fusionYield.persona.skills
      .filter((s) => s.level)
      .sort((a, b) => a.level - b.level);
  }
}
