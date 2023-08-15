import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Lodging } from '../models/lodging.model';

@Injectable({
  providedIn: 'root',
})
export class LodgingService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1';
  constructor() {
    console.log(this.http);
  }

  getLodgings() {
    return this.http.get(`${this.apiUrl}/lodgings`);
  }

  getLodging(id: string) {
    return this.http.get(`${this.apiUrl}/lodgings/${id}`);
  }

  createLodging(lodging: Lodging) {
    return this.http.post(`${this.apiUrl}/lodgings`, lodging);
  }

  updateLodging(id: string, lodging: Lodging) {
    return this.http.patch(`${this.apiUrl}/lodgings/${id}`, lodging);
  }

  deleteLodging(id: string) {
    return this.http.delete(`${this.apiUrl}/lodgings/${id}`);
  }
}
