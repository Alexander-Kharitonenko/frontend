import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { QueryBuilder } from 'odata-query-builder';
import { mapUser, UserModel } from 'projects/domain/src/users/user.model';

import {
  catchError,
  firstValueFrom,
  map,
  mergeMap,
  Observable,
  tap,
} from 'rxjs';
import {
  AuthApi,
  UserApi,
  ViewLoginModel,
  ViewRegisterModel,
} from '../communicat/open.api';

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private userApi: UserApi,
    private authApi: AuthApi,
    private router: Router
  ) {}

  public login(model: ViewLoginModel): Observable<string | null> {
    return this.authApi.login(model).pipe(
      tap((accessToken) => {
        if (accessToken !== null) {
          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        }
      }),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }

  public registration(model: ViewRegisterModel): Observable<string | null> {
    return this.authApi.registration(model).pipe(
      tap((accessToken) => {
        if (accessToken !== null) {
          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        }
      }),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['authorization']);
  }

  public getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public async getCurrentUser(): Promise<UserModel> {
    // let user: UserModel | null = null;
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    const jwtService = new JwtHelperService();
    const payload = jwtService.decodeToken(token!);

    const filter = new QueryBuilder()
      .filter((f) => f.filterExpression('Email', 'eq', `${payload.email}`))
      .toQuery()
      .replace('?$filter=', '');

    let user = await firstValueFrom(
      this.userApi.getAll(undefined, undefined, filter, undefined, false).pipe(
        map((response) => {
          return mapUser(response.data![0]);
        })
      )
    );

    return user;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token !== null) {
      const jwtService = new JwtHelperService();
      let isInvalidToken = jwtService.isTokenExpired(token);

      if (!isInvalidToken) {
        return true;
      }
    }

    return false;
  }

  public refreshToken(token: string): Observable<boolean> {
    const jwtService = new JwtHelperService();

    const decodedToken = jwtService.decodeToken(token!);
    const email: string = decodedToken.email;
    const filter = new QueryBuilder()
      .filter((f) => f.filterExpression('Email', 'eq', `${email}`))
      .toQuery()
      .replace('?$filter=', '');

    return this.userApi
      .getAll(undefined, undefined, filter, undefined, false)
      .pipe(
        mergeMap((response) => {
          const user = new ViewLoginModel();
          user.email = response.data![0].email;

          user.password = atob(response.data![0].password!);

          return this.login(user);
        }),
        map((token) => {
          return token !== null ? true : false;
        })
      );
  }
}
