import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';

@Component({
  selector: 'app-note-loyut',
  templateUrl: './note-layout.component.html',
  styleUrls: ['./note-layout.component.css'],
})
export class NoteLayoutComponent implements OnInit {
  constructor(public readonly auth: AuthenticationService) {}

  ngOnInit(): void {}
}
