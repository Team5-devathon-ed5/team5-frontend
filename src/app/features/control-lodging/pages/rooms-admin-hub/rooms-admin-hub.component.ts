import { Component } from '@angular/core';
import { Lodging } from '../../models/lodging.model';

@Component({
  selector: 'app-room-admin-hub',
  templateUrl: './rooms-admin-hub.component.html',
  styleUrls: ['./rooms-admin-hub.component.scss'],
})
export class RoomsAdminHubComponent {
  rooms: Lodging[] = [
    {
      id: '1',
      name: 'Casa de playa',
      guestCapacity: '4',
      category: 'Casa',
      description: 'Casa de playa con vista al mar',
      address: 'Av. La playa 123',
      city: 'Lima',
      country: 'Perú',
      checkInHour: '15:00',
      checkOutHour: '12:00',
      priceNight: '100',
      images: [],
    },
    {
      id: '2',
      name: 'Casa de playa',
      guestCapacity: '4',
      category: 'Casa',
      description: 'Casa de playa con vista al mar',
      address: 'Av. La playa 123',
      city: 'Lima',
      country: 'Perú',
      checkInHour: '15:00',
      checkOutHour: '12:00',
      priceNight: '100',
      images: [],
    },
  ];

  deleteRoom(id: string | undefined) {
    console.log('Eliminando habitación', id);
  }
}
