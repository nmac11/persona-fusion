import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Injector,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaStoreService } from '../services/persona-store.service';
import { FusionNode } from '../models/fusion-node';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { serviceToken } from '../helpers/service-token-helper';
import { partialMatchRegExp } from '../helpers/reg-exp-helpers';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'my-list-root',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
})
export class MyListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  personaStoreService: PersonaStoreService;

  savedPersonae: MatTableDataSource<FusionNode>;
  displayedColumns: string[] = [
    'saveName',
    'persona',
    'currentLevel',
    'arcanaName',
  ];

  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const game = this.route.parent.snapshot.params.game;
    this.personaStoreService = this.injector.get<PersonaStoreService>(
      serviceToken[game].personaStore,
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadList();
  }

  applyFilter(key: string = '') {
    this.savedPersonae.filter = key.toLowerCase();
  }

  clearFilter() {
    setTimeout(() => {
      this.savedPersonae.filter = '';
    }, 100);
  }

  private loadList(): void {
    this.personaStoreService
      .loadAll()
      .then((savedPersonae) => this.setDataSource(savedPersonae));
  }

  private setDataSource(savedPersonae: FusionNode[]): void {
    this.savedPersonae = new MatTableDataSource<FusionNode>(savedPersonae);
    this.savedPersonae.paginator = this.paginator;
    this.configFilter();
    this.configSort();
  }

  private configFilter(): void {
    this.savedPersonae.filterPredicate = (data, filter) => {
      const filteredProperties = [
        data.saveName,
        data.persona.name,
        data.currentLevel,
        data.persona.arcanaName,
      ];
      return filteredProperties.some((prop) =>
        partialMatchRegExp(filter).test(prop.toString()),
      );
    };
  }

  private configSort(): void {
    this.savedPersonae.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'persona':
          return item.persona.name;
        case 'arcanaName':
          return item.persona.arcanaName;
        case 'saveName':
          return item.saveName.toLowerCase();
        default:
          return item[property];
      }
    };
    this.savedPersonae.sort = this.sort;
  }
}
