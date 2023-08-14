import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';

@Component({
  selector: 'app-lodging',
  templateUrl: './lodging.component.html',
  styleUrls: ['./lodging.component.scss'],
})
export class LodgingComponent implements OnInit {
  checkIn!: Date;
  checkOut!: Date;
  lodging = {
    name: 'Hotel Las Palmas',
    details: 'Hotel 5 estrellas',
    price: 100,
    image: 'assets/images/hotel.jpg',
    checkIn: this.checkIn,
    checkOut: this.checkOut,
    rating: 4.7,
    phone: '123456789',
    address: 'Calle 123',
    country: 'Colombia',
    email: 'example@gmail.com',
  };

  minDate: Date = new Date();
  maxDate: Date = new Date();

  ngOnInit(): void {
    this.maxDate.setDate(this.minDate.getDate() + 90);
    console.log('lodging');
    console.log(this.minDate);
  }

  selectedChange(rangeTrave: DateRange<Date>) {
    // TODO: llamar al servicio para establecer checkIn y checkOut
    this.checkIn = rangeTrave.start as Date;
    this.checkOut = rangeTrave.end as Date;
    console.log(this.checkIn);
    console.log(this.checkOut);
  }
}
