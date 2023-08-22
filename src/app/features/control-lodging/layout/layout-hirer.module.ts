import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutHirerRoutingModule } from './layout-hirer-routing.module';
import { LayoutHirerComponent } from './layout-hirer.component';
import { HeaderControlLodgingComponent } from '../components/header-control-lodging/header-control-lodging.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';

@NgModule({
  declarations: [LayoutHirerComponent, HeaderControlLodgingComponent],
  imports: [CommonModule, LayoutHirerRoutingModule, AngularMaterialModule],
})
export class LayoutHirerModule {}
