import { Component } from '@angular/core';

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
export class AppComponent {
  title = 'Note';
}
