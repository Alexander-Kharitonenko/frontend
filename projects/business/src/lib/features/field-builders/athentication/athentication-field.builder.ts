import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldService } from '../../../services/fields/field.service';

@Injectable({ providedIn: 'root' })
export class AthenticationFieldBuilder {
  public readonly register: FormlyFieldConfig[];
  public readonly login: FormlyFieldConfig[];

  constructor(private readonly fields: FieldService) {
    this.register = this.buildeRegister();
    this.login = this.buildeLogin();
  }

  private buildeLogin(): FormlyFieldConfig[] {
    const email: FormlyFieldConfig = {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
      validators: {
        email: {
          expression: (c: FormControl) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(c.value);
          },
          message: () => `Emaill is not valid`,
        },
      },
    };

    const password: FormlyFieldConfig = {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'password',
        placeholder: 'Enter password',
        required: true,
      },

      validators: {
        password: {
          expression: (c: FormControl) => {
            return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(c.value);
          },
          message: () => `Password is not valid`,
        },
      },
    };

    return [email, password];
  }

  private buildeRegister(): FormlyFieldConfig[] {
    const email: FormlyFieldConfig = {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },

      validators: {
        email: {
          expression: (c: FormControl) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(c.value);
          },
          massage: () => `Emaill is not valid`,
        },
      },
    };

    const login: FormlyFieldConfig = {
      key: 'login',
      type: 'input',
      templateOptions: {
        label: 'login',
        placeholder: 'Enter login',
        required: true,
      },

      validators: {
        login: {
          expression: () => {},
          massage: () => {},
        },
      },
    };

    const password: FormlyFieldConfig = {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'password',
        placeholder: 'Enter password',
        required: true,
      },

      validators: {
        password: {
          expression: (c: FormControl) => {
            return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(c.value);
          },
          message: () => `Password is not valid`,
        },
      },
    };

    return [email, login, password];
  }
}
