import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { Category, Lodging, EXTRAS_NAMES } from './models/lodging.model';

@Component({
  selector: 'app-lodging',
  templateUrl: './lodging.component.html',
  styleUrls: ['./lodging.component.scss'],
})
export class LodgingComponent implements OnInit {
  checkIn!: Date;
  checkOut!: Date;
  price = 100;
  image = 'assets/images/hotel.jpg';
  extrasArray: [string, boolean][] = [];
  extrasNames: [string, string][] = [];

  // TODO: get lodging from service
  lodging: Lodging = {
    name: 'Hotel Las Palmas',
    guestCapacity: 4,
    priceNight: 75,
    description:
      'Lorem ipsum, rabpellendus magni quis nemo quidem quas debitis cupiditate earum dolore eveniet at aliquid quae sequi harum ab quos laborum nisi? Voluptas atque asperiores tempore, ad autem voluptatibus sint ut dolores numquam molestiae quos! Atque nobis soluta animi dolores odio? Ipsum esse deleniti voluptatum nostrum eligendi, adipisci ratione aperiam et. Error accusantium tempore reiciendis deserunt consequatur magni, tenetur id at totam quasi porro molestiae quaerat us reprehenderit quos aperiam est? Nesciunt quis minus totam facere ratione molestias, corporis, dolores possimus accusamus sequi illum! Tempore iure praesentium ex sunt officia voluptates, inventore tempora, in voluptatum corporis delectus veniam eos unde beatae?',
    longitude: 12341,
    latitude: 41231,
    reputation: 4.7,
    category: Category.BEST_REVIEW,
    address: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    city: 'Bogotá',
    country: 'Colombia',
    checkInHour: '15:00',
    checkOutHour: '12:00',
    extras: {
      hasWhellchairAccess: true,
      hasKitchen: true,
      hasInternet: true,
      hasTv: true,
      hasLaundry: true,
      hasWcAdjust: true,
      hasShowerAdjust: true,
      hasParking: true,
      hasElevator: true,
    },
  };

  minDate: Date = new Date();
  maxDate: Date = new Date();

  ngOnInit(): void {
    this.maxDate.setDate(this.minDate.getDate() + 90);
    console.log('lodging');
    console.log(this.minDate);
    this.extrasArray = Object.entries(this.lodging.extras);
    this.extrasNames = Object.entries(EXTRAS_NAMES);
  }

  selectedChange(rangeTrave: DateRange<Date>) {
    // TODO: call to service to get the price
    this.checkIn = rangeTrave.start as Date;
    this.checkOut = rangeTrave.end as Date;
    console.log(this.checkIn);
    console.log(this.checkOut);
  }
}
