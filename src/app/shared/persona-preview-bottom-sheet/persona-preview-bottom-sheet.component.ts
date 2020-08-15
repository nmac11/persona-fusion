import { Component, Inject, OnInit } from '@angular/core';
import { Persona } from '../../models/persona';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { GAME_CONFIG } from '../../injection-tokens/game-config.token';
import { GameConfig } from '../../models/game-config';

@Component({
  selector: 'shared-persona-preview-bottom-sheet',
  templateUrl: './persona-preview-bottom-sheet.component.html',
  styleUrls: ['./persona-preview-bottom-sheet.component.css'],
})
export class PersonaPreviewBottomSheetComponent implements OnInit {
  game: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    @Inject(GAME_CONFIG) private config: GameConfig,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public persona: Persona,
  ) {
    this.game = this.config.title;
  }

  ngOnInit(): void {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
