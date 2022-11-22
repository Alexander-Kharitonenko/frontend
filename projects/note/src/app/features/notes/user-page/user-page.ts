import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';
import { noteSelector } from 'projects/domain/src/notes/note-store/note.selectors';
import { UserModel } from 'projects/domain/src/users/user.model';

@Component({
  selector: 'user-app',
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.css'],
})
export class UserComponent implements OnInit {
  public user: UserModel;

  public totalNotes: number;
  public uncompletedNotes: number;
  public finishedNotes: number;

  constructor(
    private readonly auth: AuthenticationService,
    private readonly store: Store<noteSelector.NoteState>
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.auth.getCurrentUser();
    this.store
      .pipe(select(noteSelector.selectNotesByUserId(this.user.id!)))
      .subscribe((notes) => {
        this.totalNotes = notes.length;
        this.finishedNotes = notes.filter((note) => note.isCompleted).length;
        this.uncompletedNotes = notes.filter(
          (note) => !note.isCompleted
        ).length;
      });
  }
}
