import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Persona } from '../../../models/persona';
import { ActiveGameService } from '../../../services/active-game.service';

@Component({
  selector: 'game-normal-fusions-bottom-sheet',
  templateUrl: './normal-fusions-bottom-sheet.component.html',
  styleUrls: ['./normal-fusions-bottom-sheet.component.css'],
})
export class NormalFusionsBottomSheetComponent implements OnInit {
  game: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    public activeGameService: ActiveGameService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public fusion: Persona[],
  ) {
    this.game = activeGameService.game;
  }

  ngOnInit(): void {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  queryParams(): Object {
    const [p1, p2] = this.fusion.map((p) => p.name.toLowerCase());
    return { p1, p2 };
  }

  fusionPersonaNames(): string {
    return this.fusion.map((p) => p.name).join(' and ');
  }
}
