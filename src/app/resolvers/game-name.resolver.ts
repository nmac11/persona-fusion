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
export class GameNameResolver implements Resolve<string> {
  constructor(private activeGameService: ActiveGameService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
    const game = route.params.game;
    this.activeGameService.game = game;
    return game;
  }
}
