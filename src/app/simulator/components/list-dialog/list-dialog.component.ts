import {
  Component,
  Inject,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../../models/persona';
import { serviceToken } from '../../../helpers/service-token-helper';
import { CompendiumService } from '../../../services/compendium.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { partialMatchRegExp } from '../../../helpers/reg-exp-helpers';

@Component({
  selector: 'simulator-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css'],
})
export class ListDialogComponent implements AfterViewInit {
  list: Persona[];
  selectedPersona: Persona;
  @ViewChild('filterField') filterField: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { compendium: CompendiumService; persona?: Persona },
  ) {
    this.selectedPersona = data.persona;
    this.list = this.data.compendium.getAll();
  }

  ngAfterViewInit() {
    fromEvent(this.filterField.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((k: KeyboardEvent) =>
        this.applyFilter(this.filterField.nativeElement.value),
      );
  }

  applyFilter(filter: string) {
    this.list = this.data.compendium
      .getAll()
      .filter((persona: Persona) =>
        partialMatchRegExp(filter).test(persona.name),
      );
  }

  clearFilter() {
    this.list = this.data.compendium.getAll();
    this.filterField.nativeElement.value = '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  arcanaName(arcana: number): string {
    return this.data.compendium.arcanaName(arcana);
  }

  selectionChange(persona: Persona): void {
    this.selectedPersona = persona;
  }
}
