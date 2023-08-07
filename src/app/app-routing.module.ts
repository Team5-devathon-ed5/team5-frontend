import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // TODO: Add route to main
  { path: '', redirectTo: 'abled', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'abled',
    loadChildren: () =>
      import('./layout/layout.module').then(m => m.LayoutModule),
  },
  // TODO: Change to not found page
  {
    path: '**',
    redirectTo: 'abled',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
