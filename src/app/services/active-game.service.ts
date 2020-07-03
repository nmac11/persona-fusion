import { Injectable, InjectionToken } from '@angular/core';
import { serviceToken, ServiceTokenSet } from '../helpers/service-token-helper';

@Injectable()
export class ActiveGameService {
  private _game: string;

  constructor() {}

  set game(game: string) {
    this._game = game;
  }

  get game(): string {
    return this._game;
  }

  getTokenSet(): ServiceTokenSet {
    return serviceToken[this._game];
  }
}
