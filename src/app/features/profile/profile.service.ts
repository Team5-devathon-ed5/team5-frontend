/* import { HttpClient } from '@angular/common/http'; */
import { Injectable, inject } from '@angular/core';
import { UserProfile } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiUrl = 'http://localhost:8080/able';

  private snackBar = inject(MatSnackBar);

  /* private http = inject(HttpClient); */
  updateProfile(userProfile: UserProfile) {
    this.snackBar.open('Perfil actualizado', 'Cerrar', {
      duration: 2000,
    });
    console.log(userProfile);
    /* return this.http.post(`${this.apiUrl}/update-profile`, userProfile); */
  }
}
