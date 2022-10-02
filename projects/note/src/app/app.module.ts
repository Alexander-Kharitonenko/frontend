import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { NoteGlobalRouteModule } from './app.routes';
import { NoteModule } from './features/notes/note.module';
import { AUTH_API_URL } from './app.constants';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from 'projects/business/src/lib/services/authentication/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from 'projects/business/src/lib/services/authentication/authentication-Interceptor';
import { ErrorInterceptor } from 'projects/business/src/lib/services/errors/error-Interceptor';
import { MaterialModule } from './material/material.module';
import { LoyoutModule } from './features/layout-pages/loyout-module';
import { API_BASE_URL } from 'projects/business/src/lib/services/communicat/open.api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NoteRedusers } from '../../../domain/src/notes/note-store/note.reducers';
import { NoteEffects } from '../../../domain/src/notes/note-store/note.effects';

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
    LoyoutModule,
    ReactiveFormsModule,
    FormlyModule,
    MaterialModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([NoteEffects]),
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
