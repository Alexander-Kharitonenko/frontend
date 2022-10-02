import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { NoteLocalRoutingModule } from './nore-routing.module';

import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';

import { NotesComponent } from './note-page/notes.component';
import { NoteLayoutComponent } from './note-layout/note-layout.component';
import { StoreModule } from '@ngrx/store';
import { NoteRedusers } from 'projects/domain/src/notes/note-store/note.reducers';

@NgModule({
  declarations: [NotesComponent, NoteLayoutComponent],
  imports: [
    CommonModule,
    NoteLocalRoutingModule,
    MaterialModule,
    MatSidenavModule,
    HttpClientModule,
    StoreModule.forFeature('note', NoteRedusers.noteReduser),
  ],
  providers: [AuthenticationService],
})
export class NoteModule {}
