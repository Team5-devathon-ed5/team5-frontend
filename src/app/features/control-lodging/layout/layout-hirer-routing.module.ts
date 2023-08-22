import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsAdminHubComponent } from '../pages/rooms-admin-hub/rooms-admin-hub.component';
import { BookingsComponent } from '../pages/bookings/bookings.component';
import { RoomRegisterComponent } from '../pages/room-register/room-register.component';
import { LayoutHirerComponent } from './layout-hirer.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutHirerComponent,
    children: [
      { path: '', redirectTo: 'room-register', pathMatch: 'full' },
      { path: 'rooms', component: RoomsAdminHubComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'room-register', component: RoomRegisterComponent },
      { path: '**', redirectTo: 'rooms' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutHirerRoutingModule {}
