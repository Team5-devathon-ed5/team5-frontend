import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthLogin, AuthRegister, Token } from '../models/auth.model';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';

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
    const { username, password, email } = inputdata;

    return this.http
      .post<Token>(`/api/able/register`, {
        username,
        password,
        email,
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
    const { username, password } = authLogin;
    return this.http
      .post<Token>(`/api/able/login`, {
        username,
        password,
      })
      .pipe(
        tap(data => {
          if (!data) {
            localStorage.removeItem('token');
            this.router.navigate(['/auth/login']);
          }
          localStorage.setItem('token', data.jwTtoken);
          this.router.navigate(['/']);
        }),
        catchError(error => {
          if (error.status === 403) {
            this._snackBar.open('Credenciales incorrectas', 'Cerrar', {
              duration: 2000,
            });
          }
          return throwError(() => error || 'Server error');
        })
      );
  }

  setTokenId(res: Token) {
    localStorage.setItem('userData', JSON.stringify(res));
  }

  forgotPassword(email: string) {
    return this.http
      .post(`/api/able/forgot-password`, {
        email,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          this._snackBar.open('No se pudo completar el envio', 'Cerrar', {
            duration: 2000,
          });
          return err;
        },
        complete: () => {
          this._snackBar.open(
            'Se le ha enviado un e-mail con más detalles',
            'Cerrar',
            {
              duration: 2000,
            }
          );
        },
      });
  }
}
