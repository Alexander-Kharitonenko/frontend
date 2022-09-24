import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'projects/business/src/lib/services/authentication/authentication-guard';

import { NoteLayoutComponent } from './note-layout/note-layout.component';
import { NotesComponent } from './note-page/notes.component';

//сюда локальные маршруты связанные с заметками , например получить все , по id , изменить удалить , добавить

const routes: Routes = [
  {
    path: '',
    component: NoteLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'notes',
        component: NotesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteLocalRoutingModule {}
