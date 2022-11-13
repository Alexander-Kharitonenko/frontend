import { createAction, props } from '@ngrx/store';
import { UserModel } from '../user.model';

export namespace userActions {
  export const getAll = createAction(
    'GET_USER_ALL',
    props<{
      top: number | undefined;
      skip: number | undefined;
      filter: string | undefined;
      orderby: string | undefined;
      count: boolean | undefined;
    }>
  );

  //TODO: скорее всего надо избавиться от getById так как селекторы извлекают необходимые данные
  export const getById = createAction(
    'GET_USER_BY_ID',
    props<{ id: number }>()
  );

  export const add = createAction('ADD_USER', props<{ model: UserModel }>);

  export const remove = createAction('REMOVE_USER', props<{ id: number }>());

  export const update = createAction(
    'UPDATE_USER',
    props<{ model: UserModel }>()
  );
}
