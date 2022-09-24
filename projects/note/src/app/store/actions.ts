import { createAction, props } from '@ngrx/store';
import { NoteModel } from 'projects/domain/src/notes/note.model';

export namespace noteActions {
  export const getAll = createAction('GET_NOTE_ALL');

  export const getById = createAction(
    'GET_NOTE_BY_ID',
    props<{ id: number }>()
  );

  export const getByUserId = createAction(
    'GET_NOTE_BY_USER_ID',
    props<{ id: number }>()
  );

  export const add = createAction('ADD_NOTE', props<{ note: NoteModel }>());

  export const addAll = createAction(
    'ADD_NOTE',
    props<{ notes: ReadonlyArray<NoteModel> }>()
  );

  export const remove = createAction('REMOVE_NOTE', props<{ id: number }>());

  export const update = createAction(
    'UPDATE_NOTE',
    props<{ model: NoteModel }>()
  );
}

export namespace userActions {
  export const getAll = createAction('GET_USER_ALL');

  export const getById = createAction(
    'GET_USER_BY_ID',
    props<{ id: number }>()
  );

  export const add = createAction('ADD_USER');

  export const remove = createAction('REMOVE_USER', props<{ id: number }>());

  export const update = createAction('UPDATE_USER', props<{ model: string }>());
}
