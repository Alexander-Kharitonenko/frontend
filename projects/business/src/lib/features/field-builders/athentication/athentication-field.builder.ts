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
    const email = this.fields.emailField(
      'email',
      'Email address',
      'Enter email',
      true
    );

    const password = this.fields.passwordField(
      'password',
      'password',
      'Enter password',
      true
    );

    return [email, password];
  }

  private buildeRegister(): FormlyFieldConfig[] {
    const email = this.fields.emailField(
      'email',
      'Email address',
      'Enter email',
      true
    );

    const login = this.fields.nameField('login', 'login', 'Enter login', true);

    const password = this.fields.passwordField(
      'password',
      'password',
      'Enter password',
      true
    );

    return [email, login, password];
  }
}
