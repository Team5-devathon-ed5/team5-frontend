import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../features/home/home.module';
import { ProfileModule } from '../features/profile/profile.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    HomeModule,
    ProfileModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
