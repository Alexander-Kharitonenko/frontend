import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { QueryBuilder } from 'odata-query-builder';
import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';
import { NoteModel } from 'projects/domain/src/notes/note.model';
import { combineLatest, filter, map, Observable, take, tap } from 'rxjs';
import { noteActions } from '../../../../../../domain/src/notes/note-store/note.actions';

@Component({
  selector: 'app-note-page',
  templateUrl: './notes.component.html',
  styleUrls: ['notes.component.css'],
})
export class NotesComponent implements OnInit {
  public data$: Observable<{
    completedNotes: NoteModel[];
    incompleteNotes: NoteModel[];
  }>;

  private readonly pageSize = 5;
  private skip = 0;
  public count: number;

  constructor(
    private readonly auth: AuthenticationService,
    private readonly store: Store<{ note: NoteModel[] }>
  ) {}

  drop(event: CdkDragDrop<NoteModel[]> | null) {
    if (event?.previousContainer === event?.container) {
      moveItemInArray(
        event?.container?.data!,
        event?.previousIndex!,
        event?.currentIndex!
      );
    } else {
      let note = event?.previousContainer?.data[event?.previousIndex]!;

      transferArrayItem(
        event?.previousContainer?.data!,
        event?.container?.data!,
        event?.previousIndex!,
        event?.currentIndex!
      );
    }
  }

  submit() {}

  async ngOnInit(): Promise<void> {
    let user = await this.auth.getCurrentUser();

    const odataFilter = new QueryBuilder()
      .filter((f) => f.filterExpression('UserId', 'eq', user?.id!))
      .toQuery()
      .replace('?$filter=', '');

    this.store.dispatch(
      noteActions.getAll({
        top: undefined,
        skip: undefined,
        filter: odataFilter,
        orderby: undefined,
        count: false,
      })
    );

    let incompleteNotes$ = this.store.select('note').pipe(
      map((notes) => {
        this.count = notes.length;
        let data = notes
          .filter((note) => !note.isCmpleted)
          .slice(0, this.pageSize);
        return data;
      })
    );

    let completedNotes$ = this.store.select('note').pipe(
      map((notes) => {
        let data = notes
          .filter((note) => note.isCmpleted)
          .slice(0, this.pageSize);
        return data;
      })
    );

    this.data$ = combineLatest([completedNotes$, incompleteNotes$]).pipe(
      map(([completedNotes, incompleteNotes]) => ({
        completedNotes,
        incompleteNotes,
      }))
    );
  }
}
