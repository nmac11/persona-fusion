import { Component, Inject, OnInit, Input } from '@angular/core';
import { Persona } from '../../models/persona';
import { AppSettingsService } from '../../services/app-settings.service';
import { GameConfig } from '../../models/game-config';
import { GAME_CONFIG } from '../../injection-tokens/game-config.token';

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
    @Inject(GAME_CONFIG) private config: GameConfig,
    private appSettingsService: AppSettingsService,
  ) {}

  ngOnInit(): void {}

  get affinities(): string[] {
    return this.config.affinities;
  }

  skills(): string {
    return this.persona?.skills.map((s) => s.name).join(', ');
  }

  expanded: () => boolean = () => {
    return this.appSettingsService.getValues()['EXPANDDETAILS'];
  };
}
