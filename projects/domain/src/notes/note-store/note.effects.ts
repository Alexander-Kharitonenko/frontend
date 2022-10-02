import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NoteApi } from 'projects/business/src/lib/services/communicat/open.api';
import { mapNote, NoteModel } from 'projects/domain/src/notes/note.model';
import { catchError, firstValueFrom, map, mergeMap, throwError } from 'rxjs';
import { noteActions } from './note.actions';

@Injectable({ providedIn: 'root' })
export class NoteEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly api: NoteApi
  ) {}

  //TODO: в действие getAll добавить параметры OData для пагинации и фильтрации

  notes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.getAll),
      mergeMap(async (actoin) =>
        firstValueFrom(
          this.api
            .getAll(undefined, undefined, actoin.filter, undefined, undefined)
            .pipe(
              map((response) => {
                const notes = response.data!.map((el) =>
                  mapNote(el)
                ) as Array<NoteModel>;

                return noteActions.addAll({ notes });
              })
            )
        )
      )
    )
  );
}
