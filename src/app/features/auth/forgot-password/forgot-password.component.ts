import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  constructor(
    private service: AuthService,
    private router: Router,
    private _notification: NotificationService
  ) {}

  forgotPassForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get f() {
    return this.forgotPassForm;
  }

  forgotPassword() {
    if (!this.f.valid) {
      return;
    }
    this.service.forgotPassword(this.f.value).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        const message =
          err.status === 404
            ? 'No se pudo completar la solicitud de cambio de contraseña'
            : err.statusText;
        throw Error(message);
      },
      complete: () => {
        this._notification.showSuccess(
          'Se le ha enviado un e-mail con más detalles'
        );
      },
    });
  }
}
