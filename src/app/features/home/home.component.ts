import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  category: string[] = [
    'cabañas',
    'junto_lago',
    'junto_mar',
    'lujo',
    'mejores_criticas',
    'piscinas',
    'reservas_rapidas',
    'resorts',
  ];
}
