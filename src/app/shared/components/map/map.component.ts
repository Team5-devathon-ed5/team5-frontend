import { Component, AfterViewInit } from '@angular/core';
import { control, Map, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (!navigator.geolocation) {
      console.log('no se accedio la ubicación');
    }
    navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;
      const map = new Map('map').setView(
        [coords.latitude, coords.longitude],
        13
      );
      console.log(
        `lat: ${position.coords.latitude}, ${position.coords.longitude}`
      );
      tileLayer(
        'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 20,
          errorTileUrl: '',
          //en el error image se debe colocar o una url de una imagen o importar la imagen y colocar en donde esta
          attribution:
            '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        }
      ).addTo(map);
      control.scale().addTo(map);

      marker([coords.latitude, coords.longitude], {
        title: 'user',
      })
        .bindPopup('<h2>Usuario es: pedro</h2>')
        .addTo(map);
    });
    this.watchPosition();
  }

  watchPosition() {
    const desLat = 0;
    const desLon = 0;
    const id = navigator.geolocation.watchPosition(
      position => {
        console.log(
          `lat: ${position.coords.latitude}, ${position.coords.longitude}`
        );
        if (position.coords.latitude == desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      err => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}
