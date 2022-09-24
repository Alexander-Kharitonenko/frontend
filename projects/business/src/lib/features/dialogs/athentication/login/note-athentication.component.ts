import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';
import {
  LoginModel,
  mapLoginModel,
} from 'projects/domain/src/athentication/view-login.model';
import { AthenticationFieldBuilder } from '../../../field-builders/athentication/athentication-field.builder';

@Component({
  selector: 'app-authentication',
  templateUrl: './note-athentication.component.html',
  styleUrls: ['./note-athentication.component.css'],
})
export class AthenticationComponent {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    public readonly fields: AthenticationFieldBuilder
  ) {}

  public form = new FormGroup({});

  public model = new LoginModel();

  onSubmit(model: LoginModel) {
    const requestData = mapLoginModel(model);
    this.auth.login(requestData).subscribe(() => {
      const token = this.auth.getToken();

      let isSuccessful: Boolean;

      isSuccessful = token !== null ? true : false;

      if (isSuccessful) {
        this.router.navigate(['/']);
      }
    });
  }
}
