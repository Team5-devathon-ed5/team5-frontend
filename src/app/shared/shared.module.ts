import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MapComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  exports: [
    AngularMaterialModule,
    HeaderComponent,
    FooterComponent,
    MapComponent,
  ],
})
export class SharedModule {}
