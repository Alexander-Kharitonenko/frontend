import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CreateNoteDto } from 'projects/business/src/lib/services/communicat/open.api';
import { noteActions } from 'projects/domain/src/notes/note-store/note.actions';
import { noteSelector } from 'projects/domain/src/notes/note-store/note.selectors';
import { NoteFieldBuilder } from '../../../field-builders/notes/notes-field.builder';
import { OnInit } from '@angular/core';
import { NoteState } from 'projects/domain/src/notes/note-store/note.state';

@Component({
  selector: 'note-add-dialog-app',
  templateUrl: 'note-add-dialog.component.html',
  styleUrls: ['note-add-dialog.component.css'],
})
export class NoteAddDialogComponent implements OnInit {
  constructor(
    public readonly fields: NoteFieldBuilder,
    public dialogRef: MatDialogRef<NoteAddDialogComponent>,
    public readonly store: Store<noteSelector.NoteState>
  ) {}

  public form: FormGroup;
  public model: CreateNoteDto;

  public onSubmit(note: CreateNoteDto): void {
    this.store.dispatch(noteActions.createNote({ note }));
    this.dialogRef.close({
      title: note.title,
      details: note.details,
    });
  }

  ngOnInit(): boolean {
    this.form = new FormGroup({});
    this.model = new CreateNoteDto();
    return true;
  }
}
