import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { NoteLocalRoutingModule } from './nore-routing.module';

import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';

import { NoteLayoutComponent } from './note-layout/note-layout.component';
import { NotesComponent } from './note-page/notes.component';
import { NotePartComponent } from './note-part/note.patr.component';

import { StoreModule } from '@ngrx/store';
import { NoteRedusers } from 'projects/domain/src/notes/note-store/note.reducers';
import { EffectsModule } from '@ngrx/effects';
import { NoteEffects } from 'projects/domain/src/notes/note-store/note.effects';
import { NoteAddDialogComponent } from 'projects/business/src/lib/features/dialogs/notes/add/note-add-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { NoteEditDialogComponent } from 'projects/business/src/lib/features/dialogs/notes/edit/note-edit-component';
import { UserComponent } from './user-page/user-page';
import { NoteConfirmationDialogComponent } from 'projects/business/src/lib/features/dialogs/notes/confirmation/note-confirmation.component';
import { NoteHomeComponent } from './note-home/note-home.component';

@NgModule({
  declarations: [
    NoteLayoutComponent,
    NoteHomeComponent,
    NotesComponent,
    NotePartComponent,
    NoteAddDialogComponent,
    NoteEditDialogComponent,
    NoteConfirmationDialogComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    NoteLocalRoutingModule,
    MaterialModule,
    MatSidenavModule,
    FormlyModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('notes', NoteRedusers.noteReduser),
    EffectsModule.forFeature([NoteEffects]),
  ],
  providers: [AuthenticationService],
})
export class NoteModule {}
