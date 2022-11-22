import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CreateNoteDto,
  NoteApi,
  UpdateNoteDto,
} from 'projects/business/src/lib/services/communicat/open.api';
import { CompletedSecvice } from 'projects/business/src/lib/services/completed/completed.service';
import { mapNote, NoteModel } from 'projects/domain/src/notes/note.model';
import { exhaustAll, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs';
import { NoteService } from '../note.service';
import { noteActions } from './note.actions';

@Injectable({ providedIn: 'root' })
export class NoteEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly api: NoteApi,
    private readonly completed: CompletedSecvice,
    private readonly noteService: NoteService
  ) {}

  getAllNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.getAll),
      switchMap((actoin) =>
        this.api
          .getAll(undefined, undefined, actoin.filter, undefined, undefined)
          .pipe(
            map((response) => {
              const notes = response.data!.map((el) =>
                mapNote(el)
              ) as Array<NoteModel>;

              notes.reverse();

              return noteActions.addAll({ notes });
            })
          )
      )
    )
  );

  updateIsСompletedNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.updateIsСompleted),
      map((action) => {
        this.completed.wait();
        let model = new UpdateNoteDto();
        model.title = action.model.title;
        model.details = action.model.details;
        if (action.model.isCompleted) {
          model.isCompleted = false;
        } else {
          model.isCompleted = true;
        }

        return { action: action, model: model };
      }),
      switchMap((data) =>
        this.api.patch(data.action.model.id!, data.model).pipe(
          map((res) => {
            let note = new NoteModel();
            note.id = res.resursId!;
            note.title = data.model.title!;
            note.userId = data.action.model.userId;
            note.details = data.model.details!;
            note.isCompleted = data.model.isCompleted!;
            note.createDate = data.action.model.createDate;
            note.editTame = res.touching!;

            return noteActions.update({ model: note });
          })
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.Refresh),
      map((action) => {
        let model = new UpdateNoteDto();
        model.title = action.model.title;
        model.details = action.model.details;
        model.isCompleted = action.model.isCompleted;

        return { action: action, model: model };
      }),
      switchMap((data) =>
        this.api.patch(data.action.id, data.model).pipe(
          map((res) => {
            let note = new NoteModel();
            note.id = res.resursId!;
            note.title = data.model.title!;
            note.userId = data.action.userId;
            note.details = data.model.details!;
            note.isCompleted = data.model.isCompleted!;
            note.createDate = data.action.createDate;
            note.editTame = res.touching!;

            return noteActions.update({ model: note });
          })
        )
      )
    )
  );

  addNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.createNote),
      map((action) => {
        const newNote = new CreateNoteDto();
        newNote.title = action.note.title!;
        newNote.details = action.note.details!;
        newNote.userId = action.note.userId!;
        return newNote;
      }),
      switchMap((data) => this.api.addNote(data)),
      switchMap((res) =>
        this.api.get(res.resursId!).pipe(
          map((res) => {
            const note = mapNote(res);
            return noteActions.addNote({ note });
          })
        )
      )
    )
  );

  removeNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.remove),
      switchMap((action) =>
        this.api.delete(action.noteId).pipe(
          map((data) => {
            return noteActions.removeSuccess({ resursId: data.resursId! });
          })
        )
      )
    )
  );
}
