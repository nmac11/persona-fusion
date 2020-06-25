import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Persona } from '../../../models/persona';
import { CompendiumService } from '../../../services/compendium.service';
import { partialMatchRegExp } from '../../../helpers/reg-exp-helpers';

@Component({
  selector: 'simulator-dialog-persona-list',
  templateUrl: './dialog-persona-list.component.html',
  styleUrls: ['./dialog-persona-list.component.css'],
})
export class DialogPersonaListComponent implements OnInit, AfterViewInit {
  @ViewChild('filterField') filterField: ElementRef;
  @Input('compendium') compendiumService: CompendiumService;
  @Output() changeSelected: EventEmitter<Persona | null> = new EventEmitter();
  @Output() dblClickSelection: EventEmitter<Persona> = new EventEmitter();

  list: Persona[];

  constructor() {}

  ngOnInit(): void {
    this.list = this.compendiumService.getAll();
  }

  ngAfterViewInit(): void {
    fromEvent(this.filterField.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((k: KeyboardEvent) =>
        this.applyFilter(this.filterField.nativeElement.value),
      );
  }

  clearFilter(): void {
    this.list = this.compendiumService.getAll();
    this.filterField.nativeElement.value = '';
  }

  applyFilter(filter: string): void {
    this.list = this.compendiumService
      .getAll()
      .filter((persona: Persona) =>
        partialMatchRegExp(filter).test(persona.name),
      );
  }

  selectionChange(persona: Persona): void {
    this.changeSelected.emit(persona);
  }

  dblClickSubmit(persona: Persona): void {
    this.dblClickSelection.emit(persona);
  }
}
