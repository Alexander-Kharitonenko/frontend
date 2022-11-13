import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';
import { NoteService } from 'projects/domain/src/notes/note.service';

/*
    в качестве главного компонента выступает AppComponent. Этот компонент выступает в качестве контейнера для остальных компонентов, 
    которые будут обслуживать запросы к приложению. Но чтобы можно было внедрить в AppComponent тот компонент, который обрабатывает запрос, 
    необходимо использовать элемент router-outlet, он подставляет необходимый компонент представления в зависимости от роутинга
*/

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly NoteServices: NoteService,
    private readonly auth: AuthenticationService
  ) {}
  title = 'Note';

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) this.NoteServices.initializationСache();
  }
}
