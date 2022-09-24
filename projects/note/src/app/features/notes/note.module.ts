import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { NoteLocalRoutingModule } from './nore-routing.module';

import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';

import { NotesComponent } from './note-page/notes.component';
import { NoteLayoutComponent } from './note-layout/note-layout.component';

@NgModule({
  declarations: [NotesComponent, NoteLayoutComponent],
  imports: [
    CommonModule,
    NoteLocalRoutingModule,
    MaterialModule,
    MatSidenavModule,
    HttpClientModule,
  ],
  providers: [AuthenticationService],
})
export class NoteModule {}
