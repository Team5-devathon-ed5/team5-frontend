import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Extras } from '../models/lodging.model';

@Injectable({
  providedIn: 'root',
})
export class ExtrasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1';

  getExtrasLodging(id: string) {
    return this.http.get(`${this.apiUrl}/lodgings/${id}/extras`);
  }

  updateExtrasLodging(id: string, extras: Extras) {
    return this.http.patch(`${this.apiUrl}/lodgings/${id}/extras`, extras);
  }

  createExtrasLodging(id: string, extras: Extras) {
    return this.http.post(`${this.apiUrl}/lodgings/${id}/extras`, extras);
  }

  deleteExtrasLodging(id: string) {
    return this.http.delete(`${this.apiUrl}/lodgings/${id}/extras`);
  }
}
