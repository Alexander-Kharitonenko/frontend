import { ViewUserModelDto } from 'projects/business/src/lib/services/communicat/open.api';

export class UserModel {
  public id?: number;
  public login?: string;
  public password?: string;
  public email?: string;
}

export function mapUser(model: ViewUserModelDto): UserModel {
  const target = new UserModel();

  if (typeof model === null || undefined) {
    return target;
  }
  target.id = model.id!;
  target.email = model.email;
  target.login = model.login;
  target.password = model.password;

  return target;
}
