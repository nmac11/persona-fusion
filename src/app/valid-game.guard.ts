import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { serviceToken } from './helpers/service-token-helper';

@Injectable({
  providedIn: 'root',
})
export class ValidGameGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const game = next.params.game;
    const allowedAccess = Object.keys(serviceToken).includes(game);
    if (!allowedAccess) this.router.navigate(['']);
    return allowedAccess;
  }
}
