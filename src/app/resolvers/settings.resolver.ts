import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SettingsPreloaderService } from '../services/settings-preloader.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsResolver {
  constructor(private settingsPreloaderService: SettingsPreloaderService) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<void> {
    await this.settingsPreloaderService.fetchAll();
  }
}
