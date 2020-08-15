import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Persona } from '../../models/persona';
import { GameConfig } from '../../models/game-config';
import { GAME_CONFIG } from '../../injection-tokens/game-config.token';

@Component({
  selector: 'shared-fusion-preview-bottom-sheet',
  templateUrl: './fusion-preview-bottom-sheet.component.html',
  styleUrls: ['./fusion-preview-bottom-sheet.component.css'],
})
export class FusionPreviewBottomSheetComponent implements OnInit {
  game: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    @Inject(GAME_CONFIG) private config: GameConfig,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public fusion: { persona: Persona; level?: number }[],
  ) {
    this.game = this.config.title;
  }

  ngOnInit(): void {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  queryParams(): any {
    const [p1, p2] = this.fusion.map((p) => {
      let param = p.persona.name.toLowerCase();
      if (p.level) param = param + ',' + p.level;
      return param;
    });
    return { p1, p2 };
  }
}
