import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Injector,
} from '@angular/core';
import { Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActiveGameService } from '../../../services/active-game.service';

@Component({
  selector: 'game-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css'],
})
export class PersonaListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  compendiumService: CompendiumService;

  personae: MatTableDataSource<Persona>;
  displayedColumns: string[] = ['name', 'level', 'arcanaName', 'inherits'];

  constructor(
    private injector: Injector,
    private router: Router,
    private activeGameService: ActiveGameService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.personae = new MatTableDataSource<Persona>();
    const tokens = this.activeGameService.getTokenSet();
    this.compendiumService = this.injector.get<CompendiumService>(
      tokens.compendium,
    );
    this.personae.data = this.compendiumService.getAll();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.personae.sort = this.sort;
    this.personae.paginator = this.paginator;
  }

  applyFilter(key: string = '') {
    this.personae.filter = key.toLowerCase();
  }

  clearFilter() {
    setTimeout(() => {
      this.personae.filter = '';
    }, 100);
  }
}
