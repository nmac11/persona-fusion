import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../../models/persona';
import { AppSettingsService } from '../../services/app-settings.service';
import { ActiveGameService } from '../../services/active-game.service';

const AFFINITIES = {
  p3: [
    'slash',
    'strike',
    'pierce',
    'fire',
    'ice',
    'electricity',
    'wind',
    'light',
    'darkness',
  ],
  p4: ['physical', 'fire', 'ice', 'electricity', 'wind', 'light', 'darkness'],
  p5: [
    'physical',
    'gun',
    'fire',
    'ice',
    'electricity',
    'wind',
    'psychic',
    'nuke',
    'bless',
    'curse',
  ],
};

@Component({
  selector: 'shared-persona-info',
  templateUrl: './persona-info.component.html',
  styleUrls: ['./persona-info.component.css'],
})
export class PersonaInfoComponent implements OnInit {
  @Input('persona') persona: Persona;
  stats = ['st', 'ma', 'en', 'ag', 'lu'];
  affValues = {
    s: 'Strong',
    w: 'Weak',
    d: 'Absorb',
    r: 'Repel',
    n: 'Block',
    '-': '--',
  };

  constructor(
    private appSettingsService: AppSettingsService,
    private activeGameService: ActiveGameService,
  ) {}

  ngOnInit(): void {}

  get affinities(): string[] {
    const baseGame = this.activeGameService.game.substr(0, 2);
    return AFFINITIES[baseGame];
  }

  skills(): string {
    return this.persona?.skills.map((s) => s.name).join(', ');
  }

  expanded: () => boolean = () => {
    return this.appSettingsService.getValues()['EXPANDDETAILS'];
  };
}
