import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NoteApi } from 'projects/business/src/lib/services/communicat/open.api';
import { mapNote, NoteModel } from 'projects/domain/src/notes/note.model';
import { firstValueFrom, map, mergeMap } from 'rxjs';
import { noteActions } from './actions';

@Injectable({ providedIn: 'root' })
export class NoteEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly api: NoteApi
  ) {}

  notes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.getAll),
      mergeMap(async () =>
        firstValueFrom(
          this.api
            .getAll(undefined, undefined, undefined, undefined, undefined)
            .pipe(
              map((response) => {
                const notes = response.data!.map((el) =>
                  mapNote(el)
                ) as ReadonlyArray<NoteModel>;

                return noteActions.addAll({ notes });
              })
            )
        )
      )
    )
  );
}
