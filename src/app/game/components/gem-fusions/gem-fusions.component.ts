import { Component, OnInit, Injector, Input } from '@angular/core';
import { p5GemFusionProvider } from '../../../tokens/p5/gem-fusion-service-token';
import { ActiveGameService } from '../../../services/active-game.service';
import { CompendiumService } from '../../../services/compendium.service';
import { GemFusionService } from '../../../services/gem-fusion.service';
import { Persona } from '../../../models/persona';

@Component({
  selector: 'game-gem-fusions',
  templateUrl: './gem-fusions.component.html',
  styleUrls: ['./gem-fusions.component.css'],
  providers: [p5GemFusionProvider],
})
export class GemFusionsComponent implements OnInit {
  @Input('persona') persona: Persona;
  fusions: any;
  private compendiumService: CompendiumService;
  private fusionService: GemFusionService;

  constructor(
    private injector: Injector,
    private activeGameService: ActiveGameService,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.compendiumService = this.injector.get<CompendiumService>(tokens.compendium);
    this.fusionService = this.injector.get<GemFusionService>(tokens.gemFusion);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.fusions = this.persona?.special
        ? []
        : this.fusionService.findFusions(this.persona);
    }, 0);
  }
}
