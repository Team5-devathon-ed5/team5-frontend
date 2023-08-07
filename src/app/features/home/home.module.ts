import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { StorefrontComponent } from './components/storefront/storefront.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [
    HomeComponent,
    StorefrontComponent,
    SearchFormComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    AngularMaterialModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
