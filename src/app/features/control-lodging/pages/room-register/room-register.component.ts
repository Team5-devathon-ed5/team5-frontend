import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { generarHorarios } from '../../models/lodging.model';

@Component({
  selector: 'app-room-register',
  templateUrl: './room-register.component.html',
  styleUrls: ['./room-register.component.scss'],
})
export class RoomRegisterComponent {
  step = 0;
  panelOpenState = false;
  horarios: string[] = [];
  selectedFile: any = null;

  formRoom = new FormGroup({
    name: new FormControl('', [Validators.required]),
    guestCapacity: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    checkInHour: new FormControl('', [Validators.required]),
    checkOutHour: new FormControl('', [Validators.required]),
    priceNight: new FormControl('', [Validators.required]),
    images: new FormControl([], [Validators.required]),
  });

  constructor() {
    generarHorarios(this.horarios);
  }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files ?? null;
  }

  uploadFile() {
    if (this.selectedFile) {
      console.log('Subiendo archivo', this.selectedFile.name);
    }
  }

  sendRoom() {
    console.log(this.formRoom.value);
  }
}
