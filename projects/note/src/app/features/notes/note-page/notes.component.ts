import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NoteAddDialogComponent } from 'projects/business/src/lib/features/dialogs/notes/add/note-add-dialog.component';
import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';
import { CreateNoteDto } from 'projects/business/src/lib/services/communicat/open.api';
import { CompletedSecvice } from 'projects/business/src/lib/services/completed/completed.service';
import { noteSelector } from 'projects/domain/src/notes/note-store/note.selectors';
import { NoteModel } from 'projects/domain/src/notes/note.model';
import { NoteService } from 'projects/domain/src/notes/note.service';
import { UserModel } from 'projects/domain/src/users/user.model';
import { BehaviorSubject, delay, map, Observable, repeatWhen, tap } from 'rxjs';
import { noteActions } from '../../../../../../domain/src/notes/note-store/note.actions';

@Component({
  selector: 'app-note-page',
  templateUrl: './notes.component.html',
  styleUrls: ['notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: NoteModel[] = [];

  completedNotes: NoteModel[] = [];
  incompleteNotes: NoteModel[] = [];

  completedNotes$: Observable<NoteModel[]>;
  incompleteNotes$: Observable<NoteModel[]>;

  private user: UserModel;
  public currentNotes$: Observable<NoteModel[]>;

  public readonly pageSize = 10;
  public selectedPage = 1;
  public totalPages: number[];
  private skip = 0;
  private take = 0;

  public isReady: boolean;

  constructor(
    private readonly auth: AuthenticationService,
    private readonly store: Store<noteSelector.NoteState>,
    private readonly note: NoteService,
    private readonly activateRoute: ActivatedRoute,
    private readonly completed: CompletedSecvice,
    public dialog: MatDialog
  ) {
    this.completed.isCompleted.subscribe((data) => {
      this.isReady = data;
    });
  }

  public move(event: CdkDragDrop<NoteModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let note = event?.previousContainer?.data[event?.previousIndex]!;
      this.store.dispatch(noteActions.updateIsСompleted({ model: note }));

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      setTimeout(() => this.completed.ready(), 500);
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(NoteAddDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result === 'object') {
        const note = new CreateNoteDto({
          title: result.title,
          details: result.details,
          userId: this.user.id,
        });
        this.store.dispatch(noteActions.createNote({ note }));
        this.getNotes(this.selectedPage);
      }
    });
  }

  //helpers
  public getNotes(page: number): void {
    this.selectedPage = page;

    this.skip = this.pageSize * page - this.pageSize;
    this.take = this.pageSize * page;

    this.currentNotes$
      .pipe(
        map((notes) => {
          let data = notes
            .slice(this.skip, this.take)
            .filter((el) => el.isCompleted);

          return data;
        })
        /*  tap((data) => {
        this.completedNotes = data;
      }) */
      )
      .subscribe((data) => {
        this.completedNotes = data;
      });

    this.currentNotes$
      .pipe(
        map((notes) => {
          let data = notes
            .slice(this.skip, this.take)
            .filter((el) => !el.isCompleted);

          return data;
        })
        /*  tap((data) => {
        this.incompleteNotes = data;
      }) */
      )
      .subscribe((data) => {
        this.incompleteNotes = data;
      });
  }

  private calculatePages(count: number, pageSize: number): number[] {
    if (count !== 0) {
      let result = Math.ceil(count / pageSize);
      return Array.from({ length: result }, (_, i) => i + 1);
    }

    return [1];
  }

  async ngOnInit(): Promise<void> {
    this.note.initializationСache();
    this.user = await this.auth.getCurrentUser();

    let param: string = this.activateRoute.snapshot.params['page'];

    this.selectedPage = parseInt(param);

    this.currentNotes$ = this.store.pipe(
      select(noteSelector.selectNotesByUserId(this.user.id!)),
      tap((data) => {
        this.totalPages = this.calculatePages(data.length, this.pageSize);
      })
    );

    this.getNotes(this.selectedPage);
  }
}
