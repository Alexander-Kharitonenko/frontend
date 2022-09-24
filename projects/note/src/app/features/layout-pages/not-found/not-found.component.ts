import { Component } from '@angular/core';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  back(): void {
    try {
      window.history.back();
    } catch (e) {
      console.log((e as Error).message);
    }
  }
}
