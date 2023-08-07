export interface Token {
  jwTtoken: string;
  id: string;
}

export interface AuthLogin {
  email: string;
  password: string;
}

export interface AuthRegister {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  lastName: string;
  country: string;
}
