import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingRoutingModule } from './lodging-routing.module';
import { LodgingComponent } from './lodging.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [LodgingComponent, CarouselComponent, CalendarComponent],
  imports: [
    CommonModule,
    LodgingRoutingModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [LodgingComponent],
})
export class LodgingModule {}
