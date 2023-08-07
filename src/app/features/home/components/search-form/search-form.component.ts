import { Component } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  adults = 1;
  children = 0;

  increaseAdults() {
    this.adults++;
  }

  decreaseAdults() {
    if (this.adults > 1) {
      this.adults--;
    }
  }

  increaseChildren() {
    this.children++;
  }

  decreaseChildren() {
    if (this.children > 0) {
      this.children--;
    }
  }
}
