import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.scss'],
})
export class StorefrontComponent {
  @Input() image!: number;
}
