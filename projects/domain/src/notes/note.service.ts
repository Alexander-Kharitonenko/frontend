import { Injectable } from '@angular/core';
import { NoteApi } from 'projects/business/src/lib/services/communicat/open.api';

@Injectable({ providedIn: 'root' })
export class NoteService {
  constructor(private readonly api: NoteApi) {}

  public initializationСache() {}
}
