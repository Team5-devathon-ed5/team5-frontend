import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from 'src/app/features/profile/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private jwtData: string | null;
  jwtToken!: string;

  private http = inject(HttpClient);

  constructor() {
    this.jwtData = localStorage.getItem('userData') || null;
    this.jwtToken = localStorage.getItem('token') || '';
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
    return this.http.get<User>(`/api/v1/users/${this.getUserId()}`, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
        Accept: 'application/json',
      },
    });
  }

  updateProfile(userProfile: User) {
    return this.http.patch(`/api/v1/users/${this.getUserId()}`, userProfile, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
        Accept: 'application/json',
      },
    });
  }
}
