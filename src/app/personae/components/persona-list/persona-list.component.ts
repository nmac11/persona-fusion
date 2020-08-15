import {
  Component, Inject, OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TitleService } from '../../../services/title.service';
import { GameConfig } from '../../../models/game-config';
import { GAME_CONFIG } from '../../../injection-tokens/game-config.token';

@Component({
  selector: 'personae-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css'],
})
export class PersonaListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  personae: MatTableDataSource<Persona>;
  displayedColumns: string[] = ['name', 'level', 'arcanaName', 'inherits'];

  constructor(
    @Inject(GAME_CONFIG) private config: GameConfig,
    private compendiumService: CompendiumService,
    private router: Router,
    private titleService: TitleService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.personae = new MatTableDataSource<Persona>();
    this.titleService.setTitle(this.config.fullTitle);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.personae.sort = this.sort;
    this.personae.paginator = this.paginator;
    setTimeout(() => (this.personae.data = this.compendiumService.getAll()), 0);
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
