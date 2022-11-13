import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UpdateNoteDto } from 'projects/business/src/lib/services/communicat/open.api';
import { noteActions } from 'projects/domain/src/notes/note-store/note.actions';
import { noteSelector } from 'projects/domain/src/notes/note-store/note.selectors';
import { NoteFieldBuilder } from '../../../field-builders/notes/notes-field.builder';
import { NoteEditData } from './note-edit-data';

@Component({
  selector: 'note-add-dialog-app',
  templateUrl: './note-edit-component.html',
  styleUrls: ['./note-edit-component.css'],
})
export class NoteEditDialogComponent implements OnInit {
  public form: FormGroup;
  public model: UpdateNoteDto;
  constructor(
    public readonly fields: NoteFieldBuilder,
    public dialogRef: MatDialogRef<NoteEditDialogComponent>,
    public readonly store: Store<noteSelector.NoteState>,
    @Inject(MAT_DIALOG_DATA) public data: NoteEditData
  ) {}

  public onSubmit(model: UpdateNoteDto): void {
    (model.isCompleted = this.data.isCompleted),
      this.store.dispatch(
        noteActions.Refresh({
          id: this.data.id,
          userId: this.data.userId,
          createDate: this.data.createDate,
          model,
        })
      );
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = new FormGroup({});
    this.model = new UpdateNoteDto({
      title: this.data.title,
      details: this.data.details,
    });
  }
}
