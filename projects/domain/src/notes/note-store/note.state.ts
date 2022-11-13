import { NoteModel } from '../note.model';

export interface NoteState {
  notes: NoteModel[];
}

export const noteState: NoteState = {
  notes: [],
};
