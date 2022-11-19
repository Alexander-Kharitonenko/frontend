import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompletedSecvice {
  public isCompleted: BehaviorSubject<boolean>;
  constructor() {
    this.isCompleted = new BehaviorSubject<boolean>(false);
  }

  public ready() {
    this.isCompleted.next(false);
  }

  public wait() {
    this.isCompleted.next(true);
  }
}
