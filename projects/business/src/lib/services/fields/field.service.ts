import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({ providedIn: 'root' })
export class FieldService {
  constructor() {}

  public textField(
    key?: string,
    label?: string,
    placeholder?: string,
    required: boolean = false
  ): FormlyFieldConfig {
    return {
      key: key,
      type: 'textarea',
      templateOptions: {
        label: label,
        placeholder: placeholder,
        required: required,
      },
      validators: {
        text: {
          expression: (c: FormControl) => {
            //TODO: не правильно работает
            return /^[а-яА-Яё Ёa-zA-Z0-9\W\w]{1,100}$/.test(c.value);
          },
          message: () => 'too many symbols',
        },
      },
    } as FormlyFieldConfig;
  }

  public shortTextField(
    key?: string,
    label?: string,
    placeholder?: string,
    required: boolean = false
  ): FormlyFieldConfig {
    return {
      key: key,
      type: 'input',
      templateOptions: {
        label: label,
        placeholder: placeholder,
        required: required,
      },
      validators: {
        text: {
          expression: (c: FormControl) => {
            //TODO: не правильно работает
            return /^[а-яА-Яё Ёa-zA-Z0-9]{1,40}$/.test(c.value);
          },
          message: () => 'the text is too long or has special symbols',
        },
      },
    } as FormlyFieldConfig;
  }

  public emailField(
    key?: string,
    label?: string,
    placeholder?: string,
    required: boolean = false
  ): FormlyFieldConfig {
    return {
      key: key,
      type: 'input',
      templateOptions: {
        label: label,
        placeholder: placeholder,
        required: required,
      },
      validators: {
        email: {
          expression: (email: FormControl) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value);
          },
          message: () => `Emaill is not valid`,
        },
      },
    } as FormlyFieldConfig;
  }

  public nameField(
    key?: string,
    label?: string,
    placeholder?: string,
    required: boolean = false
  ): FormlyFieldConfig {
    return {
      key: key,
      type: 'input',
      templateOptions: {
        label: label,
        placeholder: placeholder,
        required: required,
      },
      validators: {
        name: {
          expression: (login: FormControl) => {
            if (login.value !== null || undefined) {
              false;
            }
            //TODO: не правильно работает
            return /[А-Яа-яA-Za-z0-9]{3,20}$/.test(login.value);
          },
          message: () => 'Name is not valid',
        },
      },
    };
  }

  public passwordField(
    key?: string,
    label?: string,
    placeholder?: string,
    required: boolean = false
  ): FormlyFieldConfig {
    return {
      key: key,
      type: 'input',
      templateOptions: {
        label: label,
        placeholder: placeholder,
        required: required,
      },
      validators: {
        password: {
          expression: (password: FormControl) => {
            //TODO: не правильно работает
            return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(
              password.value
            );
          },
          message: () => `Password is not valid`,
        },
      },
    } as FormlyFieldConfig;
  }
}
