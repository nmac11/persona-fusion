import { OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { Persona } from '../../models/persona';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterField') filterField: ElementRef;
  @ViewChild('clrFilterFieldBtn') clrFilterFieldBtn: ElementRef;

  personae: MatTableDataSource<Persona>;
  displayedColumns: string[] = ['name', 'level', 'arcana'];

  constructor(protected compendiumService: CompendiumService) {
    this.personae = new MatTableDataSource<Persona>(
      this.compendiumService.getAll(),
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.personae.sort = this.sort;

    fromEvent(this.filterField.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((k: KeyboardEvent) =>
        this.applyFilter(this.filterField.nativeElement.value),
      );
  }

  arcanaName(arcana: number) {
    return this.compendiumService.arcanaName(arcana);
  }

  applyFilter(key: string = '') {
    this.personae.filter = key.toLowerCase();
  }

  clearFilter() {
    this.filterField.nativeElement.value = '';
    setTimeout(() => {
      this.personae.filter = '';
    }, 100);
  }
}
