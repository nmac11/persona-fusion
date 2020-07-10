import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ActiveGameService } from '../services/active-game.service';
import { SettingsPreloaderService } from '../services/settings-preloader.service';

@Injectable({
  providedIn: 'root',
})
export class GameResolver implements Resolve<string> {
  constructor(
    private activeGameService: ActiveGameService,
    private settingsPreloaderService: SettingsPreloaderService,
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<string> {
    const game = route.params.game;
    this.activeGameService.game = game;
    await this.settingsPreloaderService.fetchAll();
    return game;
  }
}
