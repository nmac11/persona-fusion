import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Injector,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompendiumService } from '../../../services/compendium.service';
import { Persona } from '../../../models/persona';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { serviceToken } from '../../../helpers/service-token-helper';

@Component({
  selector: 'game-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css'],
})
export class PersonaListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  compendiumService: CompendiumService;

  personae: MatTableDataSource<Persona>;
  displayedColumns: string[] = ['name', 'level', 'arcanaName', 'inherits'];

  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const game = this.route.parent.snapshot.params.game;
    this.compendiumService = this.injector.get<CompendiumService>(
      serviceToken[game].compendium,
    );
    this.personae = new MatTableDataSource<Persona>(
      this.compendiumService.getAll(),
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.personae.sort = this.sort;
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
