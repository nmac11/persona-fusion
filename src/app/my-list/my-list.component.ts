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
import { partialMatchRegExp } from '../helpers/reg-exp-helpers';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreatePersonaComponent } from './components/create-persona/create-persona.component';
import { ActiveGameService } from '../services/active-game.service';

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
    private activeGameService: ActiveGameService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const tokens = this.activeGameService.getTokenSet();
    this.personaStoreService = this.injector.get<PersonaStoreService>(
      tokens.personaStore,
    );
    this.savedPersonae = new MatTableDataSource<FusionNode>();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setUpDataSource();
  }

  applyFilter(key: string = '') {
    this.savedPersonae.filter = key.toLowerCase();
  }

  clearFilter() {
    setTimeout(() => {
      this.savedPersonae.filter = '';
    }, 100);
  }

  openCreatePersonaDialog(): void {
    const dialogRef = this.dialog.open(CreatePersonaComponent, {
      panelClass: 'my-list-create-overlay-pane',
    });
    dialogRef.afterClosed().subscribe((saveId) => {
      if (saveId)
        this.router.navigate([`../edit/${saveId}`], { relativeTo: this.route });
    });
  }

  private setUpDataSource(): void {
    this.loadData();
    this.configFilter();
    this.configSort();
    this.savedPersonae.paginator = this.paginator;
  }

  private loadData(): void {
    this.personaStoreService
      .loadAll()
      .then((savedPersonae) => (this.savedPersonae.data = savedPersonae));
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
