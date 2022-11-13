import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteModule } from './features/notes/note.module';
import { LoyoutModule } from './features/layout-pages/loyout-module';
import { NotFoundComponent } from './features/layout-pages/not-found/not-found.component';
import { AuthenticationGuard } from 'projects/business/src/lib/services/authentication/authentication-guard';

//сюда глобальные маршруты: главная страница , страница логина , страница ошибки

const globalRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    loadChildren: () =>
      import('./features/notes/note.module').then((m) => m.NoteModule),
  },

  {
    path: '',
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    loadChildren: () =>
      import('./features/users/user.module').then((m) => m.UserModule),
  },

  {
    path: '**',
    redirectTo: '404',
  },

  {
    path: '404',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(globalRoutes), NoteModule, LoyoutModule],
})
export class NoteGlobalRouteModule {}
