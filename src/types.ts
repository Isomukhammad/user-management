export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
}

export interface IUser extends IRegister {
  id: string;
  last_login: string;
  created_at: string;
  is_active: boolean;
}
