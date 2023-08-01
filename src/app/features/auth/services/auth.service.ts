import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthRegister, Token } from '../models/auth.model';
import { Subscription } from 'rxjs';

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
      .post<Token>(`${this.apiUrl}able/register`, {
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

  // TODO: Clean this up
  RegisterUser(inputdata: any) {
    return this.http.post(this.apiUrl, inputdata);
  }
  GetUserbyCode(id: any) {
    return this.http.get(this.apiUrl + '/' + id);
  }
  Getall() {
    return this.http.get(this.apiUrl);
  }
  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiUrl + '/' + id, inputdata);
  }
  getuserrole() {
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin() {
    return sessionStorage.getItem('username') != null;
  }
  getrole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }
  GetAllCustomer() {
    return this.http.get('http://localhost:3000/customer');
  }
  Getaccessbyrole(role: any, menu: any) {
    return this.http.get(
      'http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu
    );
  }
}
