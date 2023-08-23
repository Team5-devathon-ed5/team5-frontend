import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthLogin, AuthRegister, Token } from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  apiUrl = 'http://localhost:8080/';

  register(inputdata: AuthRegister): Observable<Token> {
    const { password, email, name, lastName, country } = inputdata;

    return this.http.post<Token>(`/api/v1/register`, {
      password,
      email,
      name,
      last_name: lastName,
      country,
    });
  }

  login(authLogin: AuthLogin): Observable<Token> {
    const { email, password } = authLogin;
    return this.http.post<Token>(`/api/v1/login`, {
      email,
      password,
    });
  }

  setTokenId(res: Token) {
    localStorage.setItem('userData', JSON.stringify(res));
  }

  forgotPassword(email: string) {
    return this.http.post(`/api/v1/password/forgot`, email);
  }

  resetPassword(payload: string, newPassword: string) {
    return this.http.post<{ newPassword: string }>(
      `/api/v1/password/reset/${payload}`,
      {
        newPassword,
      }
    );
  }
}
