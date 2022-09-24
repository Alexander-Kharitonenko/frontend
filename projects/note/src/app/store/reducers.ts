import { createReducer, on } from '@ngrx/store';
import { NoteModel } from 'projects/domain/src/notes/note.model';
import { noteActions } from './actions';

export namespace NoteRedusers {
  export const initialState: NoteModel[] = [];

  export const noteReduser = createReducer(
    initialState,
    on(noteActions.addAll, (state, { notes }) => [...notes]),
    on(noteActions.getAll, (notes) => [...notes])
  );
}
