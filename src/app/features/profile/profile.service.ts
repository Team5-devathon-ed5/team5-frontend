import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserProfile } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.API_URL;
  private currentUserId = '1';

  private _snackBar = inject(MatSnackBar);

  private http = inject(HttpClient);

  getCurrentUser() {
    return this.http.get<UserProfile>(
      `${this.apiUrl}/users/${this.currentUserId}`
    );
  }
  updateProfile(userProfile: UserProfile) {
    console.log(userProfile);
    return this.http
      .put(`${this.apiUrl}/users/${this.currentUserId}`, userProfile)
      .pipe(
        catchError(error => {
          if (error.status === 401 || error.status === 403) {
            return this._snackBar.open('Contraseña Incorrecta', 'Cerrar', {
              duration: 2000,
            });
          }
          return error;
        })
      )
      .subscribe(() => {
        this._snackBar.open('Perfil actualizado', 'Cerrar', {
          duration: 2000,
        });
      });
  }
}
