import { OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CompendiumService } from '../../services/compendium.service';
import { Persona } from '../../models/persona';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

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
  }

  arcanaName(arcana: number) {
    return this.compendiumService.arcanaName(arcana);
  }

  applyFilter(key: string = '') {
    this.personae.filter = key.toLowerCase();
  }
}
