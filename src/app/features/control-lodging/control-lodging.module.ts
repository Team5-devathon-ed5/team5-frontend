import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlLodgingRoutingModule } from './control-lodging-routing.module';
import { RoomsAdminHubComponent } from './pages/rooms-admin-hub/rooms-admin-hub.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { RoomRegisterComponent } from './pages/room-register/room-register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';

@NgModule({
  declarations: [
    RoomsAdminHubComponent,
    BookingsComponent,
    RoomRegisterComponent,
  ],
  imports: [
    CommonModule,
    ControlLodgingRoutingModule,
    SharedModule,
    AngularMaterialModule,
  ],
})
export class ControlLodgingModule {}
