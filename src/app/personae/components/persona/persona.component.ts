import { Inject, OnInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { FusionChartService } from '../../../services/fusion-chart.service';
import { Persona } from '../../../models/persona';
import { Observer, Observable, Subscription } from 'rxjs';
import { SettingsService } from '../../../services/settings.service';
import { TitleService } from '../../../services/title.service';
import { GAME_CONFIG } from '../../../injection-tokens/game-config.token';
import { GameConfig } from '../../../models/game-config';

@Component({
  selector: 'personae-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit, OnDestroy {
  persona: Persona;
  specialFusion: Persona[] = [];
  routeParamsSub: Subscription;

  constructor(
    @Inject(GAME_CONFIG) private config: GameConfig,
    private compendiumService: CompendiumService,
    private fusionChartService: FusionChartService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: TitleService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.params.subscribe((p: object) => {
      this.persona = this.compendiumService.find(p['persona_name']);
      if (this.persona) {
        this.specialFusion = this.fusionChartService.getSpecialFusions(
          this.persona,
        );
        this.titleService.setTitle(
          this.persona.name,
          this.config.fullTitle,
        );
      } else {
        this.titleService.setTitle(
          'Persona not found',
          this.config.fullTitle,
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSub.unsubscribe();
  }

  status(): string {
    if (!this.settingsService.testPersona(this.persona)) return 'blocked';
    else if (this.persona.gem) return 'gem';
    else return 'allowed';
  }

  showTriangleFusions: () => boolean = () => {
    return (
      !this.persona.special &&
      this.config.fusionSystem === 'old'
    );
  };

  showGemFusions: () => boolean = () => {
    return (
      !this.persona.special &&
      this.config.fusionSystem === 'new'
    );
  };
}
