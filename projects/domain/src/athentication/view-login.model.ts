import { ViewLoginModel } from 'projects/business/src/lib/services/communicat/open.api';

export class LoginModel {
  public password: string;
  public email: string;
}

export function mapLoginModel(model: LoginModel): ViewLoginModel {
  const target = new ViewLoginModel();
  target.email = model.email;
  target.password = model.password;

  return target;
}
