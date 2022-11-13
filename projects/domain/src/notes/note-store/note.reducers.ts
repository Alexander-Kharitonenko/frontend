import { createReducer, on } from '@ngrx/store';
import { NoteModel } from 'projects/domain/src/notes/note.model';
import { noteActions } from './note.actions';

export namespace NoteRedusers {
  export const initialState: NoteModel[] = [];

  export const noteReduser = createReducer(
    initialState,
    on(noteActions.addAll, (state, { notes }) => {
      return notes;
    }),
    on(noteActions.addNote, (state, { note }) => {
      if (!state.includes(note) && note) {
        const newState = [...state, note].sort((a, b) =>
          a.id > b.id ? -1 : 1
        );

        return newState;
      }
      return state;
    }),
    on(noteActions.update, (state, { model }) => {
      const newNotes = state.filter((note) => note.id !== model.id);
      const newState = [...newNotes, model].sort((a, b) =>
        a.id > b.id ? -1 : 1
      );

      return newState;
    }),
    on(noteActions.removeSuccess, (state, { resursId }) => {
      const notes = state.filter((el) => el.id !== resursId);
      const newState = [...notes].sort((a, b) => (a.id > b.id ? -1 : 1));
      return newState;
    })
  );
}
