import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      {
        path: 'reset-password/:payload',
        component: ResetPasswordComponent,
      },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
