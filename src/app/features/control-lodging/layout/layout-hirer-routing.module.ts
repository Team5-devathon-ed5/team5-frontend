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
      { path: '', redirectTo: 'room-form', pathMatch: 'full' },
      { path: 'rooms', component: RoomsAdminHubComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'room-form', component: RoomRegisterComponent },
      { path: 'room-form/:id', component: RoomRegisterComponent },
      { path: '**', redirectTo: 'rooms' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutHirerRoutingModule {}
