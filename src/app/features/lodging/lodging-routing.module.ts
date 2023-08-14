import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LodgingComponent } from './lodging.component';

const routes: Routes = [
  { path: '', redirectTo: 'lodging', pathMatch: 'full' },
  { path: 'lodging', component: LodgingComponent, children: [] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LodgingRoutingModule {}
