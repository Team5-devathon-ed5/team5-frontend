import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  images: string[] = [
    'https://cdn.nettimokki.com/live/uploads/image/52801_52900/52833_08a1eecc05d08530_800X600.jpg',
    'https://cdn.nettimokki.com/live/uploads/image/52801_52900/52833_d270614ffc171a12_800X600.jpg',
    'https://cdn.nettimokki.com/live/uploads/image/52801_52900/52833_0f296dbbe9fda1a0_800X600.jpg',
    'https://cdn.nettimokki.com/live/uploads/image/52801_52900/52833_66359e80d6e37fb7_800X600.jpg',
    'https://cdn.nettimokki.com/live/uploads/image/52801_52900/52833_31079f0eed8e9fdf_800X600.jpg',
    'https://cdn.nettimokki.com/live/uploads/image/52801_52900/52833_a29ec64f453b8cfe_800X600.jpg',
    'https://cdn.nettimokki.com/live/uploads/image/52801_52900/52833_81333e1595da31ea_800X600.jpg',
    // ... add more image URLs here
  ];
  currentIndex = 0;
  listOffset = 0;
  offset = 0;

  ngOnInit() {
    // TODO: llamar servicio de imagenes
    console.log('llamar a imagenes');
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    console.log(this.currentIndex);
    this.updateListOffset();
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    console.log(this.currentIndex);
    this.updateListOffset();
  }

  goToImage(index: number) {
    this.currentIndex = index;
    console.log(this.currentIndex);
    this.updateListOffset();
  }

  updateListOffset() {
    const itemWidth = 100; // Adjust as needed
    const itemWithCarousel = 700;
    this.listOffset = -(this.currentIndex * itemWidth);
    this.offset = -(this.currentIndex * itemWithCarousel);
  }
}
