import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      { path: '', redirectTo: 'hirer', pathMatch: 'full' },
      {
        path: 'hirer',
        loadChildren: () =>
          import('./layout/layout-hirer.module').then(m => m.LayoutHirerModule),
      },
      { path: '**', redirectTo: 'hirer' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlLodgingRoutingModule {}
