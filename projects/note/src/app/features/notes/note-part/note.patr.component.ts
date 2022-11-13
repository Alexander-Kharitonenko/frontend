import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NoteConfirmationDialogComponent } from 'projects/business/src/lib/features/dialogs/notes/confirmation/note-confirmation.component';
import { NoteEditDialogComponent } from 'projects/business/src/lib/features/dialogs/notes/edit/note-edit-component';
import { noteActions } from 'projects/domain/src/notes/note-store/note.actions';
import { noteSelector } from 'projects/domain/src/notes/note-store/note.selectors';
import { NoteModel } from 'projects/domain/src/notes/note.model';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'note-part-app',
  templateUrl: 'note.patr.component.html',
  styleUrls: ['note.patr.component.css'],
})
export class NotePartComponent implements OnInit {
  public note$: Observable<NoteModel>;
  public noteId: number;
  note: NoteModel;

  public previousUrl$: Observable<string>;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly store: Store<noteSelector.NoteState>,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  public edit(): void {
    this.dialog.open(NoteEditDialogComponent, {
      data: {
        id: this.note.id,
        title: this.note.title,
        details: this.note.details,
        userId: this.note.userId,
        isCmpleted: this.note.isCmpleted,
        createDate: this.note.createDate,
      },
    });
  }

  public remove(): void {
    const dialogRef = this.dialog.open(NoteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        console.log(result);
        this.store.dispatch(noteActions.remove({ noteId: this.noteId }));
        window.history.back();
      }
    });
  }

  public back(): void {
    window.history.back();
  }

  ngOnInit(): void {
    this.noteId = this.activateRoute.snapshot.params['id'];
    this.note$ = this.store.pipe(
      select(noteSelector.selectNotesById(this.noteId)),
      map((data) => {
        return data!;
      }),
      tap((data) => (this.note = data))
    );
  }
}
