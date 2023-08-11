import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserProfile } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../auth/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.API_URL;
  private jwtData: string | null;
  jwtToken!: Token;

  private _snackBar = inject(MatSnackBar);

  private http = inject(HttpClient);

  constructor() {
    this.jwtData = localStorage.getItem('userData') || null;
    this.jwtToken = JSON.parse(this.jwtData || '{}').jwTtoken;
  }

  private decodeJwt() {
    if (!this.jwtData) {
      return null;
    }

    const parts = this.jwtData.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  }

  getUserId(): string | null {
    const payload = this.decodeJwt();
    return payload ? payload.id : null;
  }

  getCurrentUser() {
    return this.http.get<UserProfile>(`/api/v1/users/${this.getUserId()}`, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
        Accept: 'application/json',
      },
    });
  }

  updateProfile(userProfile: UserProfile) {
    return this.http
      .patch(`/api/v1/users/${this.getUserId()}`, userProfile, {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        catchError(error => {
          if (error.status === 401 || error.status === 403) {
            return this._snackBar.open(
              'Debes iniciar sesión para continuar',
              'Cerrar',
              {
                duration: 2000,
              }
            );
          }
          return error;
        })
      );
  }
}
