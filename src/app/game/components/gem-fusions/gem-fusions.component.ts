import { Component, OnInit, Input } from '@angular/core';
import { GemFusionService } from '../../../services/gem-fusion.service';
import { Persona } from '../../../models/persona';
import { FusionPreviewBottomSheetComponent } from '../../../shared/fusion-preview-bottom-sheet/fusion-preview-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'game-gem-fusions',
  templateUrl: './gem-fusions.component.html',
  styleUrls: ['./gem-fusions.component.css'],
  providers: [GemFusionService],
})
export class GemFusionsComponent implements OnInit {
  @Input('persona') persona: Persona;
  fusions: any;

  constructor(
    private fusionService: GemFusionService,
    private bottomSheet: MatBottomSheet,
  ) {}

  openBottomSheet([gem, persona]: Persona[], level): void {
    const fusionData = [{ persona: gem }, { persona, level }];
    this.bottomSheet.open(FusionPreviewBottomSheetComponent, {
      data: fusionData,
    });
  }

  ngOnInit(): void {
    this.fusions = this.fusionService.findFusions(this.persona);
  }
}
