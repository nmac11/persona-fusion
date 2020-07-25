import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActiveGameService } from '../services/active-game.service';

@Component({
  selector: 'game-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  title: string;
  page: string;
  routeDataSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private activeGame: ActiveGameService,
  ) {}

  ngOnInit(): void {
    const game = this.activeGame.game;
    this.title = game;

    this.routeDataSub = this.route.firstChild.data.subscribe(
      (data) => (this.page = data.page),
    );
  }

  ngOnDestroy(): void {
    this.routeDataSub.unsubscribe();
  }
}
