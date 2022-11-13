import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { JwtModule } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { NoteGlobalRouteModule } from './app.routes';
import { NoteModule } from './features/notes/note.module';
import { LoyoutModule } from './features/layout-pages/loyout-module';
import { AUTH_API_URL } from './app.constants';
import { API_BASE_URL } from 'projects/business/src/lib/services/communicat/open.api';
import { ACCESS_TOKEN_KEY } from 'projects/business/src/lib/services/authentication/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthenticationInterceptor } from 'projects/business/src/lib/services/authentication/authentication-Interceptor';
import { ErrorInterceptor } from 'projects/business/src/lib/services/errors/error-Interceptor';
import { MaterialModule } from './material/material.module';
import { UserModule } from './features/users/user.module';
import { EffectsModule } from '@ngrx/effects';
import { NoteModel } from 'projects/domain/src/notes/note.model';

export function tokenGetter(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    NoteGlobalRouteModule,
    NoteModule,
    UserModule,
    LoyoutModule,
    ReactiveFormsModule,
    FormlyModule,
    MaterialModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.baseUrl],
      },
    }),
  ],
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.baseUrl,
    },
    {
      provide: AUTH_API_URL,
      useValue: environment.loginUrl,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
