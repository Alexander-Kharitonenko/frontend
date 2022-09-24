import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({ providedIn: 'root' })
export class FieldService {
  constructor() {}

  public nameField(
    key: string,
    label: string,
    placeholder: string,
    required: boolean
  ): FormlyFieldConfig {
    return {
      key: key,
      type: 'input',
      templateOptions: {
        label: label,
        placeholder: placeholder,
        required: required,
      },
      validators: {},
    } as FormlyFieldConfig;
  }
}
