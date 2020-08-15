import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';
import { GameConfig } from '../models/game-config';

@Component({
  selector: 'game-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  title: string;
  page: string;
  routeDataSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    @Inject(GAME_CONFIG) config: GameConfig,
  ) {
    this.title = config.title;
    this.routeDataSub = this.route.firstChild.data.subscribe(
      (data) => (this.page = data.page),
    );
  }

  ngOnInit(): void {}
}
