import { ViewRegisterModel } from 'projects/business/src/lib/services/communicat/open.api';
import { takeWhile } from 'rxjs';

export class RegisterModel {
  email: string;
  login: string;
  password: string;
}

export function mapRegisterModel(model: RegisterModel): ViewRegisterModel {
  const target = new ViewRegisterModel();

  if (model === null || undefined) {
    return target;
  }

  target.email = model.email;
  target.login = model.login;
  target.password = model.password;

  return target;
}
