import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'note-confirmation-app',
  templateUrl: './note-confirmation.component.html',
  styleUrls: ['./note-confirmation.component.css'],
})
export class NoteConfirmationDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<NoteConfirmationDialogComponent>
  ) {}
}
