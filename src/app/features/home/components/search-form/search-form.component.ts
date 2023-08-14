import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  adults = 1;

  minDate: Date = new Date();
  maxDate: Date = new Date();

  ngOnInit(): void {
    this.maxDate.setDate(this.minDate.getDate() + 90);
  }

  increaseAdults() {
    this.adults++;
  }

  decreaseAdults() {
    if (this.adults > 1) {
      this.adults--;
    }
  }
}
