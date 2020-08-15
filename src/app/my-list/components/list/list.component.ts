import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  Injector,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaStoreService } from '../../../services/persona-store.service';
import { FusionNode } from '../../../models/fusion-node';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { partialMatchRegExp } from '../../../helpers/reg-exp-helpers';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreatePersonaComponent } from '../../components/create-persona/create-persona.component';
import { TitleService } from '../../../services/title.service';
import { GameConfig } from '../../../models/game-config';
import { GAME_CONFIG } from '../../../injection-tokens/game-config.token';

@Component({
  selector: 'my-list-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  savedPersonae: MatTableDataSource<FusionNode>;
  displayedColumns: string[] = [
    'saveName',
    'persona',
    'currentLevel',
    'arcanaName',
  ];

  constructor(
    @Inject(GAME_CONFIG) private config: GameConfig,
    private personaStoreService: PersonaStoreService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private titleService: TitleService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.savedPersonae = new MatTableDataSource<FusionNode>();
    this.titleService.setTitle('My List', this.config.fullTitle);
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
        this.router.navigate([`${saveId}`], { relativeTo: this.route });
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
