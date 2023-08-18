import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User, UserProfile } from 'src/app/features/profile/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Token } from '../../auth/models/auth.model';
import { catchError } from 'rxjs';

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
    return this.http
      .get<User>(`/api/v1/users/${this.getUserId()}`, {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        catchError(err => {
          this._snackBar.open(
            'Error al recuperar los datos, intente en unos minutos',
            'Cerrar',
            {
              duration: 2000,
            }
          );
          throw err;
        })
      );
  }

  updateProfile(userProfile: UserProfile) {
    return this.http.patch(`/api/v1/users/${this.getUserId()}`, userProfile, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
        Accept: 'application/json',
      },
    });
  }
}
