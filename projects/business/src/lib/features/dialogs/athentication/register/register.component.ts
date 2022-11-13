import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'projects/business/src/lib/services/authentication/authentication.service';
import { AuthApi } from 'projects/business/src/lib/services/communicat/open.api';
import {
  mapRegisterModel,
  RegisterModel,
} from 'projects/domain/src/athentication/view-register.model';
import { AthenticationFieldBuilder } from '../../../field-builders/athentication/athentication-field.builder';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    public readonly fields: AthenticationFieldBuilder,
    private readonly auth: AuthenticationService,
    private readonly router: Router
  ) {}

  form = new FormGroup({});
  model = new RegisterModel();

  onSubmit(model: RegisterModel): void {
    const requestData = mapRegisterModel(model);
    this.auth.registration(requestData).subscribe(() => {
      const token = this.auth.getToken();

      let isSuccessful = token !== null ? true : false;

      if (isSuccessful) {
        this.router.navigate(['Home']);
      }
    });
  }

  onBack(): void {
    window.history.back();
  }
}
