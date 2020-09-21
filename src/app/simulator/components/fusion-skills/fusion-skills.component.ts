import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FusionResult } from '../../../models/fusion-result';
import { AppSettingsService } from '../../../services/app-settings.service';
import { Skill } from '../../../models/skill';
import { Probabilities } from '../../../lib/probabilities';
import { BehaviorSubject, Observable, Subscription, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GameConfig } from '../../../models/game-config';
import { GAME_CONFIG } from '../../../injection-tokens/game-config.token';

@Component({
  selector: 'simulator-fusion-skills',
  templateUrl: './fusion-skills.component.html',
  styleUrls: ['./fusion-skills.component.css'],
})
export class FusionSkillsComponent implements OnInit, OnChanges, OnDestroy {
  @Input('fusionYield') fusionYield: FusionResult;
  showProbabilities: boolean;
  fusionSubject$: BehaviorSubject<FusionResult>;
  fusionSub: Subscription;

  constructor(
    @Inject(GAME_CONFIG) private config: GameConfig,
    private appSettingsService: AppSettingsService,
  ) {
    this.showProbabilities = this.appSettingsService.getValues()['PROBABILITY'];
    this.fusionSubject$ = new BehaviorSubject(this.fusionYield);
  }

  ngOnInit(): void {
    if (this.showProbabilities && this.randomInheritance())
      this.fusionSub = this.fusionSubject$
        .pipe(switchMap(() => this.calculateProbabilities()))
        .subscribe((p) => {
          this.fusionYield.inheritableSkills.forEach(
            (s) => (s.probability = p[s.probRatio]),
          );
        });
  }

  ngOnChanges(): void {
    this.fusionSubject$.next(this.fusionYield);
  }

  ngOnDestroy(): void {
    this.fusionSub?.unsubscribe();
  }

  inheritableSkillCount(): number {
    return this.fusionYield.inheritableSkills.filter((s) => s.probRatio > 0)
      .length;
  }

  randomInheritance(): boolean {
    return this.config.randomInheritance;
  }

  approximateProbabilities(): boolean {
    const ratios = this.fusionYield.inheritableSkills
      .map((s) => s.probRatio)
      .filter((r) => r > 0);
    const variableRatios = Array.from(new Set(ratios)).length !== 1;
    const moreThanSixPicks =
      this.fusionYield.skillsInheritedCount > 6 ||
      (this.fusionYield.skillsInheritedCount === 6 && ratios.length >= 30);
    return variableRatios && moreThanSixPicks;
  }

  private calculateProbabilities(): Observable<{ [key: number]: number }> {
    if (!this.showProbabilities || !this.randomInheritance()) return;
    const ratios = this.fusionYield.inheritableSkills.map(
      (skill) => skill.probRatio,
    );
    return from(
      new Probabilities(
        ratios,
        this.fusionYield.skillsInheritedCount,
      ).calculate(),
    );
  }

  skillsToLearn(): Skill[] {
    return this.fusionYield.persona.skills
      .filter((s) => s.level)
      .sort((a, b) => a.level - b.level);
  }
}
