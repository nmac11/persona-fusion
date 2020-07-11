import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ActiveGameService } from '../services/active-game.service';

@Injectable({
  providedIn: 'root',
})
export class GameResolver implements Resolve<string> {
  constructor(private activeGameService: ActiveGameService) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<string> {
    const game = route.params.game;
    this.activeGameService.game = game;
    return game;
  }
}
