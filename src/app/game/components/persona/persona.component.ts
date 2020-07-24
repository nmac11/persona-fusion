import { OnInit, Component, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { FusionChartService } from '../../../services/fusion-chart.service';
import { Persona } from '../../../models/persona';
import { Observer, Observable, Subscription } from 'rxjs';
import { ActiveGameService } from '../../../services/active-game.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'game-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit, OnDestroy {
  persona: Persona;
  specialFusion: Persona[] = [];
  compendiumService: CompendiumService;
  fusionChartService: FusionChartService;
  settingsService: SettingsService;
  routeParamsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector,
    private activeGameService: ActiveGameService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const tokens = this.activeGameService.getTokenSet();
    this.compendiumService = this.injector.get<CompendiumService>(
      tokens.compendium,
    );
    this.fusionChartService = this.injector.get<FusionChartService>(
      tokens.fusionChart,
    );
    this.settingsService = this.injector.get<SettingsService>(tokens.settings);
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.params.subscribe((p: object) => {
      this.persona = this.compendiumService.find(p['persona_name']);
      if (this.persona)
        this.specialFusion = this.fusionChartService.getSpecialFusions(
          this.persona,
        );
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

  queryParams(): Object {
    const params = {};
    this.specialFusion.forEach(
      (p, i) => (params['p' + (i + 1)] = p.name.toLowerCase()),
    );
    return params;
  }

  showTriangleFusions: () => boolean = () => {
    return (
      !this.persona.special &&
      ['p3fes', 'p3ans', 'p3p', 'p4', 'p4g'].includes(this.activeGameService.game)
    );
  };

  showGemFusions: () => boolean = () => {
    return (
      !this.persona.special && ['p5'].includes(this.activeGameService.game)
    );
  };
}
