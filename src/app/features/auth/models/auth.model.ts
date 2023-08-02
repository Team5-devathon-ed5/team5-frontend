export interface Token {
  jwTtoken: string;
  id: string;
}

export interface AuthLogin {
  username: string;
  password: string;
}

export interface AuthRegister {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
}
