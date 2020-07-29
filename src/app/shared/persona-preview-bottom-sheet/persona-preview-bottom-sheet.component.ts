import { Component, Inject, OnInit } from '@angular/core';
import { Persona } from '../../models/persona';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ActiveGameService } from '../../services/active-game.service';

@Component({
  selector: 'shared-persona-preview-bottom-sheet',
  templateUrl: './persona-preview-bottom-sheet.component.html',
  styleUrls: ['./persona-preview-bottom-sheet.component.css'],
})
export class PersonaPreviewBottomSheetComponent implements OnInit {
  game: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private activeGameService: ActiveGameService,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public persona: Persona,
  ) {
    this.game = this.activeGameService.game;
  }

  ngOnInit(): void {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
