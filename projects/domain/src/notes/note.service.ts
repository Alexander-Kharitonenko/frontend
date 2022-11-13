import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { QueryBuilder } from 'odata-query-builder';
import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';
import { NoteApi } from 'projects/business/src/lib/services/communicat/open.api';
import { noteActions } from './note-store/note.actions';
import { NoteModel } from './note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {
  constructor(
    private readonly api: NoteApi,
    private readonly store: Store<{ notes: NoteModel[] }>,
    private readonly auth: AuthenticationService
  ) {}

  public initializationСache() {
    this.store.dispatch(
      noteActions.getAll({
        top: undefined,
        skip: undefined,
        filter: undefined,
        orderby: undefined,
        count: false,
      })
    );
  }
}
