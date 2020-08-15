import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Persona } from '../../../models/persona';
import { PersonaPreviewBottomSheetComponent } from '../../../shared/persona-preview-bottom-sheet/persona-preview-bottom-sheet.component';

@Component({
  selector: 'personae-special-fusion',
  templateUrl: './special-fusion.component.html',
  styleUrls: ['./special-fusion.component.css'],
})
export class SpecialFusionComponent implements OnInit {
  @Input('specialFusion') specialFusion;

  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {}

  openBottomSheet(persona: Persona) {
    this.bottomSheet.open(PersonaPreviewBottomSheetComponent, {
      data: persona,
    });
  }

  queryParams(): Object {
    const params = {};
    this.specialFusion.forEach(
      (p, i) => (params['p' + (i + 1)] = p.name.toLowerCase()),
    );
    return params;
  }
}
