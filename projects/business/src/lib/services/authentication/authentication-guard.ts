import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(public router: Router, private auth: AuthenticationService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    const token = this.auth.getToken();

    if (token !== null) {
      const isRefresh = this.auth.refreshToken(token);
      return isRefresh;
    }

    return this.router.navigate(['Authorization']);
  }

  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return await this.canActivate(childRoute, state);
  }
}
