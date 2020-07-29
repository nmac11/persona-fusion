import { Component, OnInit, Injector, Input } from '@angular/core';
import { p5GemFusionProvider } from '../../../tokens/p5/gem-fusion-service-token';
import { p5rGemFusionProvider } from '../../../tokens/p5r/gem-fusion-service-token';
import { ActiveGameService } from '../../../services/active-game.service';
import { CompendiumService } from '../../../services/compendium.service';
import { GemFusionService } from '../../../services/gem-fusion.service';
import { Persona } from '../../../models/persona';
import { FusionPreviewBottomSheetComponent } from '../../../shared/fusion-preview-bottom-sheet/fusion-preview-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'game-gem-fusions',
  templateUrl: './gem-fusions.component.html',
  styleUrls: ['./gem-fusions.component.css'],
  providers: [p5GemFusionProvider, p5rGemFusionProvider],
})
export class GemFusionsComponent implements OnInit {
  @Input('persona') persona: Persona;
  fusions: any;
  private compendiumService: CompendiumService;
  private fusionService: GemFusionService;

  constructor(
    private injector: Injector,
    private activeGameService: ActiveGameService,
    private bottomSheet: MatBottomSheet,
  ) {
    const tokens = this.activeGameService.getTokenSet();
    this.compendiumService = this.injector.get<CompendiumService>(
      tokens.compendium,
    );
    this.fusionService = this.injector.get<GemFusionService>(tokens.gemFusion);
  }

  openBottomSheet([gem, persona]: Persona[], level): void {
    const fusionData = [{ persona: gem }, { persona, level }]
    this.bottomSheet.open(FusionPreviewBottomSheetComponent, {
      data: fusionData,
    });
  }

  ngOnInit(): void {
    this.fusions = this.persona?.special
      ? []
      : this.fusionService.findFusions(this.persona);
  }
}
