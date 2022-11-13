import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldService } from '../../../services/fields/field.service';

@Injectable({ providedIn: 'root' })
export class NoteFieldBuilder {
  public createNote: FormlyFieldConfig[];
  public editeNote: FormlyFieldConfig[];
  constructor(private readonly fields: FieldService) {
    this.createNote = this.buildeCreateNote();
    this.editeNote = this.buildeEditeNote();
  }

  public buildeCreateNote(): FormlyFieldConfig[] {
    const title = this.fields.shortTextField(
      'title',
      'title',
      'Enter title',
      true
    );

    const details = this.fields.textField(
      'details',
      'details',
      'Enter details',
      true
    );
    return [title, details];
  }

  public buildeEditeNote(): FormlyFieldConfig[] {
    const title = this.fields.shortTextField(
      'title',
      'title',
      'Enter title',
      true
    );

    const details = this.fields.textField(
      'details',
      'details',
      'Enter details',
      true
    );
    return [title, details];
  }
}
