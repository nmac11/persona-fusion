import { Inject, Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  constructor(@Inject(String) private game: string) {
    console.log(this.game);
  }
}
