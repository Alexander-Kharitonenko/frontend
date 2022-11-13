import { createSelector } from '@ngrx/store';
import { NoteModel } from '../note.model';

export namespace noteSelector {
  export interface NoteState {
    notes: NoteModel[];
  }

  export const selectNotes = (state: NoteState) => state.notes;

  export const selectAllNotes = createSelector(selectNotes, (notes) => notes);

  export const selectNotesByUserId = (userId: number) =>
    createSelector(selectNotes, (notes) => {
      return notes.filter((note) => note.userId === userId);
    });

  export const selectNotesById = (id: number) =>
    createSelector(selectNotes, (notes) => {
      return notes.find((note) => note.id == id);
    });
}
