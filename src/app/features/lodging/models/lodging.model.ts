export interface Lodging {
  id?: number;
  ownerId?: number;
  guestCapacity: number;
  name: string;
  category: Category;
  priceNight: number;
  description: string;
  longitude: number;
  latitude: number;
  reputation: number;
  address: string;
  city: string;
  country: string;
  checkInHour: string;
  checkOutHour: string;

  extras: Extras;
}

export enum Category {
  BEST_REVIEW = 'best-review',
  LODGING = 'lodging',
  COTTTAGE = 'cottage',
  HOLTEL = 'hotel',
}

export interface Extras {
  id?: number;
  lodgingId?: string;
  hasWhellchairAccess?: boolean;
  hasKitchen?: boolean;
  hasInternet?: boolean;
  hasTv?: boolean;
  hasLaundry?: boolean;
  hasWcAdjust?: boolean;
  hasShowerAdjust?: boolean;
  hasParking?: boolean;
  hasElevator?: boolean;
}

export interface Media {
  fileUrl: string;
  fileName: string;
  fileMimeType: string;
}

export const EXTRAS_NAMES = {
  hasWhellchairAccess: 'Acceso para silla de ruedas',
  hasKitchen: 'Cocina',
  hasInternet: 'Internet',
  hasTv: 'TV',
  hasLaundry: 'Lavandería',
  hasWcAdjust: 'WC adaptado',
  hasShowerAdjust: 'Ducha adaptada',
  hasParking: 'Estacionamiento',
  hasElevator: 'Ascensor',
};

export interface Opinion {
  id: number;
  userId: number;
  lodgingId: string;
  reservationId: string;
  description: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  id: number;
  lodgingId: string;
  guestId: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
  hasCanceled: boolean;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: number;
}
