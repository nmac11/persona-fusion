import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Persona } from '../../../models/persona';

@Component({
  selector: 'game-normal-fusions-bottom-sheet',
  templateUrl: './normal-fusions-bottom-sheet.component.html',
  styleUrls: ['./normal-fusions-bottom-sheet.component.css'],
})
export class NormalFusionsBottomSheetComponent implements OnInit {
  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { game: string; fusion: Persona[] },
  ) {}

  ngOnInit(): void {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  queryParams(): Object {
    const [p1, p2] = this.data.fusion.map(p => p.name.toLowerCase())
    return { p1, p2 };
  }

  fusionPersonaNames(): string {
    return this.data.fusion.map(p => p.name).join(' and ');
  }
}
