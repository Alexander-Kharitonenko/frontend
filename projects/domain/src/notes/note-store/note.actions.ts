import { createAction, props } from '@ngrx/store';
import {
  CreateNoteDto,
  UpdateNoteDto,
} from 'projects/business/src/lib/services/communicat/open.api';
import { NoteModel } from 'projects/domain/src/notes/note.model';

export namespace noteActions {
  export const getAll = createAction(
    'GET_NOTE_ALL',
    props<{
      top: number | undefined;
      skip: number | undefined;
      filter: string | undefined;
      orderby: string | undefined;
      count: boolean | undefined;
    }>()
  );

  //TODO: скорее всего надо избавиться от getById так как селекторы извлекают необходимые данные
  export const getById = createAction(
    'GET_NOTE_BY_ID',
    props<{ id: number }>()
  );

  export const createNote = createAction(
    'CREATE_NOTE',
    props<{ note: CreateNoteDto }>()
  );
  export const addNote = createAction('ADD_NOTE', props<{ note: NoteModel }>());

  export const addAll = createAction(
    'ADD_NOTE_All',
    props<{ notes: Array<NoteModel> }>()
  );

  export const remove = createAction(
    'REMOVE_NOTE',
    props<{ noteId: number }>()
  );

  export const removeSuccess = createAction(
    'REMOVE_NOTE_SUCCESS',
    props<{ resursId: number }>()
  );

  export const updateIsСompleted = createAction(
    'UPDATE_NOTE_IS_СOMPLETED',
    props<{ model: NoteModel }>()
  );

  export const Refresh = createAction(
    'REFRESH_NOTE',
    props<{
      id: number;
      userId: number;
      createDate: Date;
      model: UpdateNoteDto;
    }>()
  );

  export const update = createAction(
    'UPDATE_NOTE',
    props<{ model: NoteModel }>()
  );
}
