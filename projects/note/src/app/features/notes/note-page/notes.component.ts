import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NoteApi } from 'projects/business/src/lib/services/communicat/open.api';
import { NoteModel } from 'projects/domain/src/notes/note.model';
import { Observable } from 'rxjs';
import { noteActions } from '../../../store/actions';

@Component({
  templateUrl: './notes.component.html',
  styleUrls: ['notes.component.css'],
})
export class NotesComponent implements OnInit {
  public notes$: Observable<NoteModel[]>;
  constructor(
    private readonly api: NoteApi,
    private readonly store: Store<{ note: NoteModel[] }>
  ) {}

  submit() {}

  ngOnInit(): void {
    this.store.dispatch(noteActions.getAll());
    this.notes$ = this.store.select('note');
  }
}
