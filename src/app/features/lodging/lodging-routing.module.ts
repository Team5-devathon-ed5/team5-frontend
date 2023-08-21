import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LodgingComponent } from './pages/lodging/lodging.component';
import { CtaLodgingComponent } from './pages/cta-lodging/cta-lodging.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      { path: '', component: CtaLodgingComponent },
      { path: 'lod/:id', component: LodgingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LodgingRoutingModule {}
