import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthLogin, AuthRegister, Token } from '../models/auth.model';
import { Observable, Subscription } from 'rxjs';

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

  register(inputdata: AuthRegister): Subscription {
    const { password, email, name, lastName, country } = inputdata;

    return this.http
      .post<Token>(`/api/v1/register`, {
        password,
        email,
        name,
        last_name: lastName,
        country,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          this._snackBar.open('No se pudo completar el registro', 'Cerrar', {
            duration: 2000,
          });
          return err;
        },
        complete: () => {
          this._snackBar.open('Registro completado', 'Cerrar', {
            duration: 2000,
          });
        },
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
