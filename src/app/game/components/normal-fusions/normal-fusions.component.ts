import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Persona } from '../../../models/persona';
import { NormalFusionService } from '../../../services/normal-fusion.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FusionPreviewBottomSheetComponent } from '../../../shared/fusion-preview-bottom-sheet/fusion-preview-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';

@Component({
  selector: 'game-normal-fusions',
  templateUrl: './normal-fusions.component.html',
  styleUrls: ['./normal-fusions.component.css'],
  providers: [NormalFusionService],
})
export class NormalFusionsComponent implements OnInit, OnDestroy {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input('persona') persona: Persona;
  fusions: Persona[][];
  nameFilters: string[] = [];
  fusionFilterSub: Subscription;

  constructor(
    private fusionService: NormalFusionService,
    private bottomSheet: MatBottomSheet,
  ) {
    this.fusionFilterSub = this.fusionService.filteredFusions$.subscribe(
      (fusions) => (this.fusions = fusions),
    );
  }

  ngOnInit(): void {
    this.fusionService.findFusions(this.persona);
  }

  ngOnDestroy(): void {
    this.fusionFilterSub.unsubscribe();
  }

  openBottomSheet(fusion: Persona[]): void {
    const fusionData = fusion.map((persona) => {
      return { persona };
    });
    this.bottomSheet.open(FusionPreviewBottomSheetComponent, {
      data: fusionData,
    });
  }

  addFilter(event: any) {
    const input: HTMLInputElement = event.input;
    const value: string = event.value.replace(/[^A-Za-z\'-\s]/g, '');

    if ((value || '').trim()) {
      this.nameFilters.push(value);
      this.filter();
    }

    if (input) input.value = '';
  }

  removeFilter(index: number) {
    this.nameFilters.splice(index, 1);
    this.filter();
  }

  private filter(): void {
    this.fusionService.filter(this.nameFilters);
  }
}
