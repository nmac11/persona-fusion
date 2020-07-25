import { Injectable, InjectionToken } from '@angular/core';
import { serviceToken, ServiceTokenSet } from '../helpers/service-token-helper';

const FULL_TITLES = {
  p3p: 'Persona 3 Portable',
  p3fes: 'Persona 3 FES: The Journey',
  p3ans: 'Persona 3 FES: The Answer',
  p4: 'Persona 4',
  p4g: 'Persona 4 Golden',
  p5: 'Persona 5',
  p5r: 'Persona 5 Royal',
};

@Injectable({ providedIn: 'root' })
export class ActiveGameService {
  game: string;

  get fullGameName(): string {
    return FULL_TITLES[this.game];
  }

  getTokenSet(): ServiceTokenSet {
    return serviceToken[this.game];
  }
}
