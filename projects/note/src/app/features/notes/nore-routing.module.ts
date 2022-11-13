import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'projects/business/src/lib/services/authentication/authentication-guard';
import { NoteHomeComponent } from './note-home/note-home.component';

import { NoteLayoutComponent } from './note-layout/note-layout.component';
import { NotesComponent } from './note-page/notes.component';
import { NotePartComponent } from './note-part/note.patr.component';
import { UserComponent } from './user-page/user-page';

//сюда локальные маршруты связанные с заметками , например получить все , по id , изменить удалить , добавить

const routes: Routes = [
  {
    path: 'Home',
    component: NoteLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      /* {
        path: '',
        component: NoteHomeComponent,
      }, */
      {
        path: 'notes/page/:page',
        component: NotesComponent,
      },
      {
        path: 'note/:id',
        component: NotePartComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteLocalRoutingModule {}
